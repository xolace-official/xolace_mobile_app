import { usePullToRefresh } from "@/src/components/shared/with-pull-to-refresh";
import { SearchTransitionContext } from "@/src/context/search-transition-context";
import { use } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CHEVRON_WIDTH = 24;
export const LINE_THICKNESS = 5;

export const CHEVRON_ANGLE_DEG = 30;
export const CHEVRON_ANGLE_RAD = (CHEVRON_ANGLE_DEG * Math.PI) / 180;

export const CHEVRON_RISE = Math.tan(CHEVRON_ANGLE_RAD) * CHEVRON_WIDTH;

export const ChevronIndicator = () => {
  const { transitionProgress } = use(SearchTransitionContext);
  const { refreshProgress } = usePullToRefresh();

  const entranceProgress = useSharedValue(1);

  useAnimatedReaction(
    () => transitionProgress.value,
    (transition) => {
      if (transition > 0.75 && entranceProgress.value === 1) {
        entranceProgress.value = withSpring(0, { duration: 1500, dampingRatio: 0.75 });
      }
    }
  );

  const combinedProgress = useDerivedValue(() => {
    const entrance = entranceProgress.value;
    const refresh = refreshProgress.value;
    return Math.max(entrance, refresh);
  });

  const rChevronMetrics = useDerivedValue(() => {
    const progressAdj = Math.pow(combinedProgress.value, 0.85);
    const midDrop = CHEVRON_RISE * progressAdj;
    const strokeW = LINE_THICKNESS;
    return { midDrop, strokeW };
  });

  const animatedPathProps = useAnimatedProps(() => {
    const { midDrop, strokeW } = rChevronMetrics.value;

    const chevronWidth = interpolate(
      combinedProgress.value,
      [0, 1],
      [CHEVRON_WIDTH, CHEVRON_WIDTH * 0.85]
    );

    const vOffset = strokeW / 2;
    const hInset = strokeW / 2;
    const left = hInset;
    const right = 2 * chevronWidth - hInset;
    const midX = chevronWidth;
    const midY = midDrop + vOffset;

    const stroke = interpolateColor(combinedProgress.value, [0, 1], ["#525252", "#737373"]);

    return {
      d: `M${left} ${vOffset} L ${midX} ${midY} L ${right} ${vOffset}`,
      strokeWidth: strokeW,
      stroke,
    };
  });

  return (
    <View style={{ transform: [{ translateY: CHEVRON_RISE }] }}>
      <Svg
        width={CHEVRON_WIDTH * 2}
        height={(CHEVRON_RISE + LINE_THICKNESS) * 2}
        viewBox={`0 0 ${CHEVRON_WIDTH * 2} ${(CHEVRON_RISE + LINE_THICKNESS) * 2}`}
        fill="none"
      >
        <AnimatedPath
          animatedProps={animatedPathProps}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
