import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { supabase } from '../../../services/supabase';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

type OtpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Otp'>;

const OtpScreen = () => {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setTimeLeft(60);
    setCanResend(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async () => {
    if (!code || code.length < 6) {
      showToast('error', 'Invalid code', 'Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup',
      });

      if (error) throw error;

      showToast('success', 'Email verified!', 'Redirecting...');
    } catch (error: any) {
      showToast('error', 'Verification failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      showToast('success', 'Code resent!', 'Check your email');
      startTimer();
    } catch (err: any) {
      showToast('error', 'Failed to resend', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Verifying..." />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={
              <Ionicons
                name="mail"
                size={48}
                color={theme === 'dark' ? '#C0C0C0' : '#000000'}
              />
            }
          />
          <Text className="text-2xl font-bold text-brand-black dark:text-brand-silver mt-4">
            Verify Your Email
          </Text>
          <Text className="text-brand-black/70 dark:text-brand-silver/70 text-center mt-2">
            We've sent a 6-digit code to{'\n'}{email}
          </Text>
        </View>

        <Input
          label="Verification Code"
          value={code}
          onChangeText={setCode}
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />

        <Button
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          className="mt-4"
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-brand-black/60 dark:text-brand-silver/60">
            Didn't receive code?{' '}
          </Text>
          {canResend ? (
            <Text
              onPress={handleResend}
              className="text-brand-black dark:text-brand-silver font-semibold"
            >
              Resend
            </Text>
          ) : (
            <Text className="text-brand-black/40 dark:text-brand-silver/40">
              Resend in {timeLeft}s
            </Text>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default OtpScreen;
