import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { View } from 'react-native';

interface AnimatedIconProps {
  icon: React.ReactNode;
  animation?: 'pulse' | 'rotate' | 'bounce';
  duration?: number;
  active?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  animation = 'rotate',
  duration = 1000,
  active = true,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      cancelAnimation(rotation);
      cancelAnimation(scale);
      cancelAnimation(translateY);
      rotation.value = 0;
      scale.value = 1;
      translateY.value = 0;
      return;
    }

    if (animation === 'rotate') {
      rotation.value = withRepeat(
        withTiming(360, { duration, easing: Easing.linear }),
        -1,
        false
      );
    } else if (animation === 'pulse') {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: duration / 2 }),
          withTiming(1, { duration: duration / 2 })
        ),
        -1,
        true
      );
    } else if (animation === 'bounce') {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: duration / 2 }),
          withTiming(0, { duration: duration / 2 })
        ),
        -1,
        true
      );
    }
  }, [animation, duration, active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {icon}
    </Animated.View>
  );
};

export default AnimatedIcon;
