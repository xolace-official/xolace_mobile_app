import ExpoModulesCore
import SwiftUI
import TipKit

import FoundationModels
import Foundation

final class AnimatedInputViewProps: ExpoSwiftUI.ViewProps {
  @Field var defaultValue: String = ""
  @Field var placeholder: String = ""
  @Field var autoFocus: Bool = false
  @Field var disableMainAction: Bool = false
  var onValueChanged = EventDispatcher()
  var onFocusChanged = EventDispatcher()
  var onPressImageGallery = EventDispatcher()
  var onPressMainAction = EventDispatcher()
  var onPressSecondIcon = EventDispatcher()
}

struct AnimatedInputView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  @ObservedObject var props: AnimatedInputViewProps
  @FocusState private var isFocused: Bool
  
  @State var text: String = ""
  @State var isGenerating: Bool = false
  @State var originalText: String? = nil  // Stores text before improvement (nil = no improvement done)
  @State var isImproving: Bool = false    // Tracks if currently streaming improvement
  @State var previousGeneratedPrompt: String? = nil  // Stores the last generated prompt to avoid repetition
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  init(props: AnimatedInputViewProps) {
    self.props = props
  }

  var body: some View {
    VStack {
      Spacer(minLength: 0)
      
      let fillColor = Color.gray.opacity(0.15)
      
      if #available(iOS 17.0, *) {
        // Inline tip above the input
        TipView(PromptInputTip(), arrowEdge: .bottom) { action in
          if action.id == "gotIt" {
            PromptInputTip().invalidate(reason: .actionPerformed)
            isFocused = true
          }
          if action.id == "takePhoto" {
            PromptInputTip().invalidate(reason: .actionPerformed)
            generatorHaptic.selectionChanged()
            props.onPressSecondIcon([:])
          }
        }

        AnimatedBottomBar(hint: props.placeholder, text: $text, isFocused: $isFocused) {
          Button {
            generatorHaptic.selectionChanged()
            props.onPressImageGallery([:])
          } label: {
            Image(systemName: "photo.badge.plus")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          Button {
            generatorHaptic.selectionChanged()
            isFocused = false
            props.onPressSecondIcon([:])
          } label: {
            Image(systemName: "camera")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          if #available(iOS 26.0, *) {
            GeneratePromptView(
              text: $text,
              isGenerating: $isGenerating,
              previousGeneratedPrompt: $previousGeneratedPrompt,
              fillColor: fillColor
            )
          }
        } trailingAction: {
          if #available(iOS 26.0, *) {
            ImprovePromptView(
              text: $text,
              isImproving: $isImproving,
              originalText: $originalText,
              fillColor: fillColor)
          }
        } mainAction: {
          let button = Button {
            generatorHaptic.selectionChanged()
            isFocused = false
            text = ""
            originalText = nil  // Reset improvement state
            props.onPressMainAction([:])
          } label: {
            Image(systemName: "arrow.up")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
          }
            .disabled(text.isEmpty || isGenerating || isImproving || props.disableMainAction)
          
          if #available(iOS 26.0, *) {
            button.buttonStyle(.glassProminent)
          } else {
            button.background(fillColor, in: .circle)
          }
        }
      } else {
        // Fallback on earlier versions
      }
      
    }
    .padding()
    .contentShape(Rectangle())
    .onTapGesture {
      if isFocused {
        generatorHaptic.selectionChanged()
        isFocused = false
      }
    }
    .gesture(
      DragGesture(minimumDistance: 20)
        .onEnded { value in
          let vertical = value.translation.height
          
          if vertical > 20 {
            // Swipe down to dismis
            generatorHaptic.selectionChanged()
            isFocused = false
          } else if vertical < -20 {
            // Swipe up to focus
            generatorHaptic.selectionChanged()
            isFocused = true
          }
        }
    )
    .onAppear {
      text = props.defaultValue
      if props.autoFocus {
        isFocused = true
      }
      
      // Configure TipKit (safe to call multiple times, will only configure once)
      if #available(iOS 17.0, *) {
        Task {
          do {
            try Tips.configure([
              .displayFrequency(.weekly),
              .datastoreLocation(.applicationDefault)
            ])
          } catch {
            // TipKit already configured or unavailable
            print("TipKit configuration: \(error.localizedDescription)")
          }
        }
      }
    }
    .onChange(of: text) { newValue in
      props.onValueChanged(["value": newValue])
    }
    .onChange(of: isFocused) { newValue in
      props.onFocusChanged(["isFocused": newValue])
    }
  }
}

