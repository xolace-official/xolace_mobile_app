//
//  ImprovePromptView.swift
//  AnimatedInput
//
//  Created by beto on 12/6/25.
//

import Foundation
import SwiftUI
import FoundationModels

@available(iOS 26.0, *)
private let model = SystemLanguageModel.default

@available(iOS 26.0, *)
struct ImprovePromptView: View {
  @Binding var text: String
  @Binding var isImproving: Bool
  @Binding var originalText: String?
  var fillColor: Color
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  var body: some View {
    if model.isAvailable && !text.isEmpty {
      Group {
        if originalText != nil {
          // Undo pill button - restore original text
          Button {
            generatorHaptic.selectionChanged()
            text = originalText ?? ""
            originalText = nil
          } label: {
            if isImproving {
              ProgressView()
                .progressViewStyle(.circular)
                .frame(height: 35)
                .padding(.horizontal, 12)
                .background(fillColor, in: Capsule())
            } else {
              Text("Undo")
                .font(.caption)
                .fontWeight(.medium)
                .foregroundStyle(Color.primary)
                .frame(height: 35)
                .padding(.horizontal, 12)
                .background(fillColor, in: Capsule())
            }
          }
          .disabled(isImproving)
        } else {
          // Improve Prompt pill button
          Button {
            generatorHaptic.selectionChanged()
            Task {
              let session = LanguageModelSession()
              do {
                isImproving = true
                originalText = text
                
                let userInput = text
                let stream = session.streamResponse(
                  options: GenerationOptions(maximumResponseTokens: 100)
                ) {
                """
                You are a tattoo-prompt enhancer.
                
                Your job:
                Transform the user's input into a concise (1–2 sentences), detailed prompt for generating realistic tattoos.
                
                Behavior rules:
                - Always describe a **realistic tattoo** (never a full image change).
                - If the user’s input implies applying a tattoo to a person (e.g., references to “my face,” “my neck,” “on me,” “on this photo,” “this pic,” “my arm,” etc.), interpret it as tattoo placement on an existing image and:
                  - Emphasize that the person, pose, and background must remain unchanged.
                  - Describe how the tattoo should be applied naturally on the visible body area.
                - If the user’s input does NOT reference a person or photo, generate a standalone tattoo design prompt.
                - Enhance vague input with style, linework, shading, artistic details, and composition.
                - Output only the improved prompt—no explanations, no quotes.
                
                Examples:
                - "change the color" → "Change the tattoo color to deep crimson red."
                - "face tattoos" → "Add small, realistic face tattoos—fine-line symbols, tiny stars, and a subtle teardrop—applied naturally without altering facial features."
                - "cover my neck in tattoos" → "Cover the visible neck area with a realistic tattoo sleeve made of dark ornamental patterns and fine-line texture while keeping the person unchanged."
                - "dragon" → "Create a traditional Japanese dragon tattoo with bold outlines, flowing clouds, and intricate scale detail."
                """
                  
                  "User input: \(userInput)"
                }
                for try await partialResponse in stream {
                  self.text = partialResponse.content
                }
                isImproving = false
              } catch {
                print("Error improving prompt: \(error)")
                isImproving = false
                // Restore original text on error
                if let original = originalText {
                  text = original
                  originalText = nil
                }
              }
            }
          } label: {
            if isImproving {
              ProgressView()
                .progressViewStyle(.circular)
                .frame(height: 35)
                .padding(.horizontal, 12)
                .background(fillColor, in: Capsule())
            } else {
              Text("Improve Prompt")
                .font(.caption)
                .fontWeight(.medium)
                .foregroundStyle(Color.primary)
                .frame(height: 35)
                .padding(.horizontal, 12)
                .background(fillColor, in: Capsule())
            }
          }
          .disabled(isImproving)
        }
      }
      .fixedSize()
      .transition(.scale.combined(with: .opacity))
      .animation(.spring(response: 0.3, dampingFraction: 0.7), value: originalText != nil)
    }
  }
}
