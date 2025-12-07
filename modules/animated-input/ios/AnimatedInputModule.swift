import ExpoModulesCore

public class AnimatedInputModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AnimatedInput")
    
    View(AnimatedInputView.self)
  }
}
