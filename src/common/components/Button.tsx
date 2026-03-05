import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const scale = useSharedValue(1);

  const silver = '#C0C0C0';
  const black = '#000000';
  const lightSilver = '#F0F0F0';

  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'primary') return isDark ? black : lightSilver;
    return isDark ? '#333333' : '#E0E0E0';
  };

  const borderColor = isDark ? silver : black;
  const getTextColor = () => {
    if (variant === 'outline') return isDark ? silver : black;
    return isDark ? silver : black;
  };
  const shadowColor = isDark ? silver : black;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  // Platform-specific shadow
  const shadowStyle = Platform.select({
    web: {
      boxShadow: `0 6px 10px ${shadowColor}80`, // 80 = 50% opacity in hex
    },
    default: {
      shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 12,
    },
  });

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor,
          backgroundColor: getBackgroundColor(),
          opacity: disabled ? 0.5 : 1,
        },
        shadowStyle,
        animatedStyle,
      ]}
      className={className}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <Text style={{ color: getTextColor(), fontWeight: '500' }}>{title}</Text>
        </>
      )}
    </AnimatedTouchable>
  );
};

export default Button;
