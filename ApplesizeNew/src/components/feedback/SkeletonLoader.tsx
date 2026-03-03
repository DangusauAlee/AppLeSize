import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animate();
  }, []);

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-width, width],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
  },
});

// Product card skeleton
export const ProductCardSkeleton: React.FC = () => (
  <View style={{ marginBottom: 16 }}>
    <SkeletonLoader height={180} borderRadius={12} />
    <View style={{ padding: 12 }}>
      <SkeletonLoader width="60%" height={20} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="40%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="80%" height={16} />
    </View>
  </View>
);
