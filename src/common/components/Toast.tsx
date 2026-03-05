import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

const AnimatedView = Animated.createAnimatedComponent(View);

const ToastConfigWithTheme: (theme: 'light' | 'dark') => ToastConfig = (theme) => {
  const isDark = theme === 'dark';
  const black = '#000000';
  const white = '#FFFFFF';

  const successBackground = isDark ? black : white;
  const errorBackground = isDark ? black : white;
  const infoBackground = isDark ? black : white;
  const textColor = isDark ? white : black;
  const borderColor = isDark ? white : black;
  const shadowColor = isDark ? white : black;

  const ToastComponent = ({ text1, text2, type }: any) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-20);

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 15 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }));

    const getBackgroundColor = () => {
      switch (type) {
        case 'success':
          return successBackground;
        case 'error':
          return errorBackground;
        default:
          return infoBackground;
      }
    };

    return (
      <AnimatedView
        style={[
          {
            backgroundColor: getBackgroundColor(),
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 8,
            borderWidth: 1,
            borderColor,
            shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 8,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>
          {text1}
        </Text>
        {text2 && (
          <Text style={{ color: textColor, fontSize: 14, marginTop: 4 }}>
            {text2}
          </Text>
        )}
      </AnimatedView>
    );
  };

  return {
    success: ToastComponent,
    error: ToastComponent,
    info: ToastComponent,
  };
};

export const showToast = (type: 'success' | 'error' | 'info', text1: string, text2?: string) => {
  Toast.show({ type, text1, text2, position: 'top' });
};

const ToastWithTheme = () => {
  const { theme } = useTheme();
  return <Toast config={ToastConfigWithTheme(theme)} />;
};

export default ToastWithTheme;
