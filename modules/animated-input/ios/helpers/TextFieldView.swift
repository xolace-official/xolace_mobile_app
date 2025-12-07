//
//  TextFieldView.swift
//  AnimatedInput
//
//  Created by beto on 11/7/25.
//

import Foundation
import SwiftUI

@available(iOS 17.0, *)
struct AnimatedBottomBar<LeadingAction: View, TrailingAction: View, MainAction: View>: View {
  var hint: String
  var tint: Color = .yellow
  var highlightWhenEmpty: Bool = true
  
  @State private var isHighlighting: Bool = false
  
  @Binding var text: String
  @FocusState.Binding var isFocused: Bool
  
  @ViewBuilder var leadingAction: () -> LeadingAction
  @ViewBuilder var trailingAction: () -> TrailingAction
  @ViewBuilder var mainAction: () -> MainAction
  
  
  var body: some View {
    let mainLayout = isFocused ?
    AnyLayout(ZStackLayout(alignment: .bottomTrailing)) :
    AnyLayout(HStackLayout(alignment: .bottom, spacing: 10))
    
    let shape = RoundedRectangle(cornerRadius: isFocused ? 25: 30)
    
    ZStack {
      mainLayout {
        let subLayout = isFocused ? AnyLayout(VStackLayout(alignment: .trailing, spacing: 20)) : AnyLayout(ZStackLayout(alignment: .trailing))
        
        subLayout {
          TextField(hint, text: $text, axis: .vertical)
            .lineLimit(isFocused ? 5 : 1)
            .focused(_isFocused)
          
          /// Trailing and leading
          HStack(spacing: 10) {
            // leading actions
            HStack(spacing: 10) {
              // each button size is 35
              HStack(spacing: 10) {
                leadingAction()
                  .frame(width: 35, height: 35)
                  .contentShape(.rect)
              }
            }
            .compositingGroup()
            .allowsHitTesting(isFocused)
            .blur(radius: isFocused ? 0 : 6)
            .opacity(isFocused ? 1 : 0)
            
            Spacer( minLength: 0)
            
            trailingAction()
              .frame(height: 35)
              .contentShape(.rect)
              .padding(.trailing, isFocused ? 55 : 0)
              .allowsHitTesting(isFocused)
              .blur(radius: isFocused ? 0 : 6)
              .opacity(isFocused ? 1 : 0)
          }
        }
        .frame(height: isFocused ? nil : 55)
        .padding(.leading, 15)
        .padding(.trailing, isFocused ? 15 : 10)
        .padding(.bottom, isFocused ? 10 : 0)
        .padding(.top, isFocused ? 20 : 0)
        .background {
          ZStack {
            HighlightingBackgroundView()
            
            shape
              .fill(.bar)
          }
        }
        
        mainAction()
          .frame(width: 50, height: 50)
          .clipShape(.circle)
        //            .background {
        //              Circle()
        //                .fill(.bar )
        //            }
          .padding(.bottom, isFocused ? 10 : 0)
          .padding(.trailing, isFocused ? 10 : 0)
        //          .visualEffect { [isFocused] content, proxy in
        //            content
        //              .offset(x: isFocused ? (proxy.size.width - 10) : 0)
        //          }
        
      }
    }
    .geometryGroup()
    .animation(.easeInOut(duration: animationDuration), value: isFocused)
  }
  
  @ViewBuilder
  private func HighlightingBackgroundView() -> some View {
    ZStack {
      let shape = RoundedRectangle(cornerRadius: isFocused ? 25: 30)
      
      if !isFocused && text.isEmpty && highlightWhenEmpty {
        shape
          .stroke(tint.gradient, style: .init(lineWidth: 3, lineCap: .round, lineJoin: .round))
          .mask {
            let clearColors: [Color] = Array.init(repeating: .clear, count: 4)
            shape
              .fill(AngularGradient(
                colors: clearColors + [Color.white] + clearColors,
                center: .center,
                angle: .init(degrees: isHighlighting ? 360 : 0)
              ))
          }
          .padding(-1.5)
          .blur(radius: 0.2)
          .onAppear {
            // enable
            withAnimation(.linear(duration: 2.5).repeatForever(autoreverses: false)) {
              isHighlighting = true
            }
          }
          .onDisappear {
            // disable
            isHighlighting = false
          }
          .transition(.blurReplace)
      }
    }
    
  }
  
  var animationDuration: CGFloat {
    return 0.22
  }
}
