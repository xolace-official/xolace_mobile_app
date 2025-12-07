import { NativeModule, requireNativeModule } from "expo";

declare class AnimatedInputModule extends NativeModule {
  // Add any module-level methods here if needed
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AnimatedInputModule>("AnimatedInput");
