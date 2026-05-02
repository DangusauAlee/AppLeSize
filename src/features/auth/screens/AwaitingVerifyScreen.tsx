import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import { useTheme } from '../../../theme';
import { useAuthStore } from '../../../store/authStore';

export default function AwaitingVerifyScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const signOut = useAuthStore((s) => s.signOut);

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';

  const floatY = useSharedValue(0);
  React.useEffect(() => {
    floatY.value = withRepeat(
      withSequence(withTiming(-10, { duration: 1800 }), withTiming(0, { duration: 1800 })),
      -1, true
    );
  }, []);
  const floatStyle = useAnimatedStyle(() => ({ transform: [{ translateY: floatY.value }] }));

  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 24 }}>
        <Animated.View style={floatStyle}>
          <Text style={{ fontSize: 72 }}>⏳</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ color: textColor, fontSize: 22, fontWeight: '800', textAlign: 'center' }}>
            Awaiting Verification
          </Text>
          <Text style={{ color: mutedColor, fontSize: 14, textAlign: 'center', lineHeight: 22 }}>
            Your account is being reviewed by the App'lesize team. You'll be notified once it's approved.
          </Text>
          <Text style={{ color: mutedColor, fontSize: 13, textAlign: 'center', marginTop: 4 }}>
            This usually takes 24–48 hours.
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(350).duration(500)} style={{ width: '100%' }}>
          <Button title="Log Out" onPress={signOut} variant="outline" />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}
