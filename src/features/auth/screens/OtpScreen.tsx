import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, BackHandler,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import { supabase } from '../../../services/supabase';
import { useTheme } from '../../../theme';
import { useAuthStore } from '../../../store/authStore';
import type { AuthStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Otp'>;

export default function OtpScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<any>();
  const { email, type } = params as { email: string; type: 'signup' | 'recovery' };
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const setResettingPassword = useAuthStore((s) => s.setResettingPassword);

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const verifiedRef = useRef(false);

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';
  const surfaceColor = isDark ? '#111111' : '#F5F5F5';
  const borderColor  = isDark ? '#FFFFFF30' : '#00000020';

  // Shake animation for wrong code
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeX.value }] }));
  const shake = () => {
    shakeX.value = withSequence(
      withTiming(10, { duration: 60 }), withTiming(-10, { duration: 60 }),
      withTiming(8,  { duration: 60 }), withTiming(-8,  { duration: 60 }),
      withTiming(0,  { duration: 60 })
    );
  };

  useEffect(() => {
    startTimer();
    setTimeout(() => inputRefs.current[0]?.focus(), 400);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBack = () => {
        if (type === 'recovery' && !verifiedRef.current) setResettingPassword(false);
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack);
    }, [type])
  );

  const startTimer = () => {
    setTimeLeft(60); setCanResend(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    if (value.length > 1) {
      // Handle paste of full code
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      pasted.forEach((d, i) => { if (i < 6) newDigits[i] = d; });
      setDigits(newDigits);
      inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
      return;
    }
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      const newDigits = [...digits];
      newDigits[index - 1] = '';
      setDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length !== 6) { showToast('error', 'Incomplete', 'Enter all 6 digits'); shake(); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type });
      if (error) throw error;
      verifiedRef.current = true;
      if (type === 'recovery') {
        navigation.navigate('SetNewPassword', { email });
      }
      // signup: RootNavigator auto-switches to App on session change
    } catch (e: any) {
      shake();
      showToast('error', 'Invalid code', e.message ?? 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      if (type === 'signup') await supabase.auth.signInWithOtp({ email });
      else await supabase.auth.resetPasswordForEmail(email);
      showToast('success', 'Code resent', 'Check your email');
      setDigits(['', '', '', '', '', '']);
      startTimer();
      inputRefs.current[0]?.focus();
    } catch (e: any) {
      showToast('error', 'Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  const allFilled = digits.every((d) => d !== '');

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Verifying..." />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          {/* Back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>

          {/* Header */}
          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ marginBottom: 40 }}>
            <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: surfaceColor, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 30 }}>✉️</Text>
            </View>
            <Text style={{ color: textColor, fontSize: 24, fontWeight: '800' }}>
              {type === 'recovery' ? 'Reset Code' : 'Verify Email'}
            </Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 6, lineHeight: 20 }}>
              We sent a 6-digit code to{'\n'}
              <Text style={{ color: textColor, fontWeight: '600' }}>{email}</Text>
            </Text>
          </Animated.View>

          {/* OTP boxes */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={[shakeStyle, { flexDirection: 'row', gap: 10, marginBottom: 32, justifyContent: 'center' }]}>
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(r) => { inputRefs.current[index] = r; }}
                value={digit}
                onChangeText={(v) => handleDigitChange(index, v)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                keyboardType="numeric"
                maxLength={index === 0 ? 6 : 1}  // allow paste on first box
                selectTextOnFocus
                style={{
                  width: 48, height: 58,
                  borderRadius: 12,
                  borderWidth: digit ? 2 : 1.5,
                  borderColor: digit ? textColor : borderColor,
                  backgroundColor: digit ? (isDark ? '#1A1A1A' : '#F0F0F0') : surfaceColor,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: '700',
                  color: textColor,
                }}
              />
            ))}
          </Animated.View>

          {/* Verify button */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <Button title="Verify" onPress={handleVerify} loading={loading} disabled={!allFilled} />
          </Animated.View>

          {/* Resend */}
          <Animated.View entering={FadeInDown.delay(280).duration(500)} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
            <Text style={{ color: mutedColor }}>Didn't receive it?  </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ color: textColor, fontWeight: '700' }}>Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: mutedColor }}>Resend in {timeLeft}s</Text>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
