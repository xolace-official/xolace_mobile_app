//
//  PromptInputTip.swift
//  AnimatedInput
//
//  Created by beto on 12/6/25.
//

import Foundation
import TipKit

@available(iOS 17.0, *)
struct PromptInputTip: Tip {
  var title: Text {
    Text("Try On and Update Tattoos Instantly")
  }

  var message: Text? {
    Text("Pick a photo and describe the change. The model only sees the selected image, so clear prompts work best.")
  }
  
  var image: Image? {
    Image(systemName: "lightbulb.max.fill")
  }
  
  var actions: [Action] {
    [
      Tip.Action(id: "gotIt" ,title: "Got it"),
      Tip.Action(id: "takePhoto" ,title: "Take a photo")
    ]
  }
}
