import React, { useState, useRef, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
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
import { useAuth } from '../../../hooks/useAuth'; // <-- import

type OtpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Otp'>;

const OtpScreen = () => {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const route = useRoute();
  const { email, type } = route.params as { email: string; type: 'signup' | 'recovery' };
  const { theme } = useTheme();
  const { setResettingPassword } = useAuth(); // <-- use setter
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const verifiedRef = useRef(false); // track if verification succeeded

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      // If user leaves screen without successful verification, clear flag
      if (type === 'recovery' && !verifiedRef.current) {
        setResettingPassword(false);
      }
    };
  }, []);

  // Handle back button / android hardware back
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (type === 'recovery' && !verifiedRef.current) {
          setResettingPassword(false);
        }
        return false; // let default back action happen
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [type])
  );

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
        type: type,
      });

      if (error) throw error;

      verifiedRef.current = true; // mark success
      showToast('success', 'Verified!', 'Redirecting...');
      
      if (type === 'signup') {
        // For signup, user is now logged in; flag is false anyway, root will switch to Main
        // Navigation will be handled by auth state change, no need to navigate
      } else if (type === 'recovery') {
        // Navigate to set new password screen (flag remains true)
        navigation.navigate('SetNewPassword', { email });
      }
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
      if (type === 'signup') {
        await supabase.auth.signInWithOtp({ email });
      } else if (type === 'recovery') {
        await supabase.auth.resetPasswordForEmail(email);
      }
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
              />
            }
          />
          <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            Verify Your {type === 'recovery' ? 'Reset Code' : 'Email'}
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8 }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
          <Text style={{ color: mutedColor }}>Didn't receive code? </Text>
          {canResend ? (
            <Text
              onPress={handleResend}
              style={{ color: textColor, fontWeight: '600' }}
            >
              Resend
            </Text>
          ) : (
            <Text style={{ color: mutedColor }}>Resend in {timeLeft}s</Text>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default OtpScreen;
