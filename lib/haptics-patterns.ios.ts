import type { HapticPatternData } from "@/modules/native-core-haptics";

/**
 * Gentle welcome haptic pattern
 * Subtle fade in/out pattern for content transitions
 */
export const welcomeHapticPattern: HapticPatternData = {
  events: [
    // Phase 1: Content fade out (0-400ms)
    // Gentle continuous haptic that fades out, representing the content dissolving
    {
      eventType: "hapticContinuous",
      time: 0.0,
      eventDuration: 0.4,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.3 },
        { parameterID: "hapticSharpness", value: 0.1 },
      ],
    },
    // Phase 2: The gradient shooting out
    // Innermost circle
    {
      eventType: "hapticTransient",
      time: 0.425,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.3 },
        { parameterID: "hapticSharpness", value: 0.3 },
      ],
    },
    // Middle circle
    {
      eventType: "hapticTransient",
      time: 0.5,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.5 },
        { parameterID: "hapticSharpness", value: 0.25 },
      ],
    },
    // Outermost circle
    {
      eventType: "hapticTransient",
      time: 0.55,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.8 },
        { parameterID: "hapticSharpness", value: 0.15 },
      ],
    },
    // Phase 3: Gradient settling
    // Gentle continuous haptic with decreasing intensity
    {
      eventType: "hapticContinuous",
      time: 0.6,
      eventDuration: 0.55,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.2 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
    // Phase 4: Content fade in (1500ms)
    // Soft arrival haptic
    {
      eventType: "hapticTransient",
      time: 1.5,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.6 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
    // Final subtle continuous haptic for content appearance
    {
      eventType: "hapticContinuous",
      time: 1.51,
      eventDuration: 0.3,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.1 },
        { parameterID: "hapticSharpness", value: 1 },
      ],
    },
  ],
  parameterCurves: [
    // Fade out curve for the continuous haptic (Phase 1)
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0.0, value: 1 },
        { relativeTime: 0.4, value: 0.0 },
        // Reset it at the end of the curve
        { relativeTime: 0.4, value: 1 },
      ],
      relativeTime: 0.0,
    },
    // Settling curves (intensity and sharpness)
    // for the continuous haptic (Phase 3)
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0, value: 1 },
        { relativeTime: 0.4, value: 0.5 },
        { relativeTime: 0.55, value: 0.0 },
        { relativeTime: 0.56, value: 1 },
      ],
      relativeTime: 0.6,
    },
    {
      parameterID: "hapticSharpnessControl",
      controlPoints: [
        { relativeTime: 0, value: 0.2 },
        { relativeTime: 0.55, value: 0.05 },
      ],
      relativeTime: 0.6,
    },
    // Fade out curve for the continuous haptic (Phase 4)
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0, value: 1 },
        { relativeTime: 0.3, value: 0 },
      ],
      relativeTime: 1.51,
    },
  ],
};

/**
 * Playful AI Playground entrance haptic
 * Strong, energetic pattern that signals "let's create something amazing!"
 * Like opening a portal to creative AI magic ✨
 */
export const playgroundEntranceHaptic: HapticPatternData = {
  events: [
    // Phase 1: Power-up sequence (0-300ms)
    // Quick ascending burst - "Charging up!"
    {
      eventType: "hapticTransient",
      time: 0.0,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.5 },
        { parameterID: "hapticSharpness", value: 0.3 },
      ],
    },
    {
      eventType: "hapticTransient",
      time: 0.08,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.65 },
        { parameterID: "hapticSharpness", value: 0.4 },
      ],
    },
    {
      eventType: "hapticTransient",
      time: 0.15,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.8 },
        { parameterID: "hapticSharpness", value: 0.5 },
      ],
    },

    // Phase 2: Explosive burst (300-350ms)
    // The "AI activation" moment - strong and sharp!
    {
      eventType: "hapticTransient",
      time: 0.3,
      parameters: [
        { parameterID: "hapticIntensity", value: 1.0 },
        { parameterID: "hapticSharpness", value: 0.9 },
      ],
    },

    // Phase 4: Playful bounce sequence (700-1100ms)
    // Fun, bouncy feeling - "This is going to be fun!"
    {
      eventType: "hapticTransient",
      time: 0.7,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.7 },
        { parameterID: "hapticSharpness", value: 0.6 },
      ],
    },
    {
      eventType: "hapticTransient",
      time: 0.85,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.6 },
        { parameterID: "hapticSharpness", value: 0.5 },
      ],
    },
    {
      eventType: "hapticTransient",
      time: 0.95,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.5 },
        { parameterID: "hapticSharpness", value: 0.4 },
      ],
    },

    // Phase 5: Settling into creative mode (1100-1400ms)
    // Gentle hum of readiness
    {
      eventType: "hapticContinuous",
      time: 1.1,
      eventDuration: 0.3,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.4 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },

    // Phase 6: Final "ready!" confirmation (1400ms)
    {
      eventType: "hapticTransient",
      time: 1.4,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.8 },
        { parameterID: "hapticSharpness", value: 0.7 },
      ],
    },
  ],
  parameterCurves: [
    // Energy wave curve - pulsing outward
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0, value: 1.0 },
        { relativeTime: 0.15, value: 0.7 },
        { relativeTime: 0.25, value: 0.85 },
        { relativeTime: 0.35, value: 0.4 },
      ],
      relativeTime: 0.35,
    },
    // Sharpness wave - becomes more diffuse
    {
      parameterID: "hapticSharpnessControl",
      controlPoints: [
        { relativeTime: 0, value: 0.9 },
        { relativeTime: 0.2, value: 0.3 },
        { relativeTime: 0.35, value: 0.15 },
      ],
      relativeTime: 0.35,
    },
    // Settling curve - gentle fade out
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0, value: 1.0 },
        { relativeTime: 0.15, value: 0.6 },
        { relativeTime: 0.3, value: 0.2 },
      ],
      relativeTime: 1.1,
    },
  ],
};

/**
 * Input focus fanfare haptic
 * Fun, energetic pattern when focusing the input field
 * Like a playful trumpet fanfare - "tu tu tu tu!" 🎺
 * Signals: "Let's create something epic!"
 */
export const inputFocusFanfareHaptic: HapticPatternData = {
  events: [
    // First "tu!" - Quick upbeat tap
    {
      eventType: "hapticTransient",
      time: 0.0,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.55 },
        { parameterID: "hapticSharpness", value: 0.6 },
      ],
    },
    // Second "tu!" - Slightly stronger
    {
      eventType: "hapticTransient",
      time: 0.1,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.65 },
        { parameterID: "hapticSharpness", value: 0.65 },
      ],
    },
    // Third "tu!" - Even stronger
    {
      eventType: "hapticTransient",
      time: 0.2,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.75 },
        { parameterID: "hapticSharpness", value: 0.7 },
      ],
    },
    {
      eventType: "hapticTransient",
      time: 0.35,
      eventDuration: 0.2,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.6 },
        { parameterID: "hapticSharpness", value: 0.15 },
      ],
    },
  ],
  parameterCurves: [
    // Slow, gentle fade - very satisfying
    {
      parameterID: "hapticIntensityControl",
      controlPoints: [
        { relativeTime: 0, value: 1.0 },
        { relativeTime: 0.2, value: 0.7 },
        { relativeTime: 0.35, value: 0.4 },
        { relativeTime: 0.45, value: 0.0 },
      ],
      relativeTime: 0.35,
    },
    // Sharpness stays soft throughout
    {
      parameterID: "hapticSharpnessControl",
      controlPoints: [
        { relativeTime: 0, value: 0.3 },
        { relativeTime: 0.45, value: 0.05 },
      ],
      relativeTime: 0.35,
    },
  ],
};

/**
 * Success/completion haptic
 * Satisfying pattern when something finishes successfully
 */
export const successHaptic: HapticPatternData = {
  events: [
    // Soft initial tap
    {
      eventType: "hapticTransient",
      time: 0.0,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.45 },
        { parameterID: "hapticSharpness", value: 0.25 },
      ],
    },
    // Slightly fuller second tap (classic success double-tap)
    {
      eventType: "hapticTransient",
      time: 0.08,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.55 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
    // Gentle, very short “satisfying tail”
    {
      eventType: "hapticContinuous",
      time: 0.12,
      eventDuration: 0.12,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.25 },
        { parameterID: "hapticSharpness", value: 0.05 },
      ],
    },
  ],
  parameterCurves: [
    {
      parameterID: "hapticIntensityControl",
      relativeTime: 0.12,
      controlPoints: [
        { relativeTime: 0.0, value: 0.3 },
        { relativeTime: 1.0, value: 0.0 },
      ],
    },
  ],
};

export const failureHaptic: HapticPatternData = {
  events: [
    // First sharp tap (not too strong)
    {
      eventType: "hapticTransient",
      time: 0.0,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.55 },
        { parameterID: "hapticSharpness", value: 0.45 },
      ],
    },

    // Slightly weaker "echo" tap
    {
      eventType: "hapticTransient",
      time: 0.1,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.4 },
        { parameterID: "hapticSharpness", value: 0.35 },
      ],
    },

    // Quick rumble tail (gives error tone without being aggressive)
    {
      eventType: "hapticContinuous",
      time: 0.13,
      eventDuration: 0.15,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.25 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
  ],
  parameterCurves: [
    {
      parameterID: "hapticIntensityControl",
      relativeTime: 0.13,
      controlPoints: [
        { relativeTime: 0.0, value: 0.4 },
        { relativeTime: 1.0, value: 0.0 },
      ],
    },
  ],
};

/**
 * Onboarding entrance haptic - synced with the staggered fade-in animations
 * Creates a gentle, welcoming rhythm that matches the visual flow
 * Updated with more delightful, spaced-out timing
 */
export const onboardingEntranceHaptic: HapticPatternData = {
  events: [
    // Video fades in (200ms delay)
    {
      eventType: "hapticTransient",
      time: 0.2,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.3 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
    // Pagination dots appear (700ms)
    {
      eventType: "hapticTransient",
      time: 0.7,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.35 },
        { parameterID: "hapticSharpness", value: 0.25 },
      ],
    },
    // Title & description fade in (950ms)
    {
      eventType: "hapticTransient",
      time: 0.95,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.45 },
        { parameterID: "hapticSharpness", value: 0.3 },
      ],
    },
    // Buttons appear (1200ms)
    {
      eventType: "hapticTransient",
      time: 1.2,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.5 },
        { parameterID: "hapticSharpness", value: 0.35 },
      ],
    },
    // Terms text completes the sequence (1450ms)
    {
      eventType: "hapticTransient",
      time: 1.45,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.4 },
        { parameterID: "hapticSharpness", value: 0.25 },
      ],
    },
    // Gentle settling haptic (1650ms)
    {
      eventType: "hapticContinuous",
      time: 1.65,
      eventDuration: 0.3,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.2 },
        { parameterID: "hapticSharpness", value: 0.15 },
      ],
    },
  ],
  parameterCurves: [
    {
      parameterID: "hapticIntensityControl",
      relativeTime: 1.65,
      controlPoints: [
        { relativeTime: 0.0, value: 0.25 },
        { relativeTime: 1.0, value: 0.0 },
      ],
    },
  ],
};

/**
 * Subtle haptic when swiping between onboarding steps
 * Quick and satisfying, like turning a page
 */
export const onboardingSwipeHaptic: HapticPatternData = {
  events: [
    {
      eventType: "hapticTransient",
      time: 0.0,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.5 },
        { parameterID: "hapticSharpness", value: 0.4 },
      ],
    },
    {
      eventType: "hapticContinuous",
      time: 0.02,
      eventDuration: 0.08,
      parameters: [
        { parameterID: "hapticIntensity", value: 0.25 },
        { parameterID: "hapticSharpness", value: 0.2 },
      ],
    },
  ],
  parameterCurves: [
    {
      parameterID: "hapticIntensityControl",
      relativeTime: 0.02,
      controlPoints: [
        { relativeTime: 0.0, value: 0.3 },
        { relativeTime: 1.0, value: 0.0 },
      ],
    },
  ],
};
