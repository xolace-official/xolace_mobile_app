import { requireNativeView } from 'expo';
import * as React from 'react';

import { AnimatedInputViewProps } from './AnimatedInput.types';

const NativeView: React.ComponentType<AnimatedInputViewProps> =
  requireNativeView('AnimatedInput');

export default function AnimatedInputView(props: AnimatedInputViewProps) {
  return <NativeView {...props} />;
}
