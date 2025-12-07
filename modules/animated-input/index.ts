// Reexport the native module. On web, it will be resolved to AnimatedInputModule.web.ts
// and on native platforms to AnimatedInputModule.ts
export { default } from './src/AnimatedInputModule';
export { default as AnimatedInputView } from './src/AnimatedInputView';
export * from  './src/AnimatedInput.types';
