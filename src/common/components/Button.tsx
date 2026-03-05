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

  const black = '#000000';
  const white = '#FFFFFF';

  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    // Primary button: opposite of page background
    return isDark ? black : white;
  };

  const borderColor = isDark ? white : black;
  const getTextColor = () => {
    if (variant === 'outline') return isDark ? white : black;
    // For primary, text is opposite of background
    return isDark ? white : black;
  };
  const shadowColor = isDark ? white : black;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const shadowStyle = Platform.select({
    web: {
      boxShadow: `0 6px 10px ${shadowColor}80`,
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
