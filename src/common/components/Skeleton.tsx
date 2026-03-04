import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  cancelAnimation,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius = 8, className = '' }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
    return () => cancelAnimation(progress);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      isDark ? ['#333333', '#555555'] : ['#E0E0E0', '#F5F5F5']
    );
    return { backgroundColor };
  });

  return (
    <Animated.View
      style={[{ width, height, borderRadius }, animatedStyle]}
      className={className}
    />
  );
};

export default Skeleton;
