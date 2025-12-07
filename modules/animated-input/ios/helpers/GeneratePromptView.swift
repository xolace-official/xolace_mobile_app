//
//  GeneratePromptView.swift
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
struct GeneratePromptView: View {
  @Binding var text: String
  @Binding var isGenerating: Bool
  @Binding var previousGeneratedPrompt: String?
  var fillColor: Color
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  var body: some View {
    if model.isAvailable {
      Button {
        generatorHaptic.selectionChanged()
        Task {
          let session = LanguageModelSession()
          do {
            isGenerating = true
            
            var promptInstructions = """
            Generate a short, original prompt for a creative tattoo design.
            Only reply with the new prompt, no quotes or explanations.
            
            Guidelines:
            - Always start the prompt with: "Generate a realistic tattoo of..."
            - Describe a specific concept in 1–2 sentences.
            - Be imaginative, visually detailed, and concise.
            - Avoid generic or vague ideas.
            - Do NOT repeat or resemble previous prompts.
            """
            
            if let previous = previousGeneratedPrompt {
              promptInstructions += """
            IMPORTANT: Avoid repeating or closely resembling this previous prompt:
            \(previous)
            """
            }
            let stream = session.streamResponse(
              options: GenerationOptions(maximumResponseTokens: 50)
            ) {
              promptInstructions
            }
            
            var generatedPrompt = ""
            for try await partialResponse in stream {
              self.text = partialResponse.content
              generatedPrompt = partialResponse.content
            }
            
            // Store the generated prompt to avoid repetition next time
            if !generatedPrompt.isEmpty {
              previousGeneratedPrompt = generatedPrompt
            }
            
            isGenerating = false
          } catch {
            print("Error generating response: \(error)")
            isGenerating = false
          }
        }
      } label: {
        if isGenerating {
          ProgressView()
            .progressViewStyle(.circular)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(fillColor, in: .circle)
        } else {
          Image(systemName: "wand.and.sparkles")
            .fontWeight(.medium)
            .foregroundStyle(Color.primary)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(fillColor, in: .circle)
        }
      }
    }
  }
}
