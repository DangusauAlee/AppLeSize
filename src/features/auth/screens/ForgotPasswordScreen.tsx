import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import { supabase } from '../../../services/supabase';
import { useTheme } from '../../../theme';
import { useAuthStore } from '../../../store/authStore';
import { EMAIL_REGEX, mapAuthError } from '../utils/validation';
import type { AuthStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const setResettingPassword = useAuthStore((s) => s.setResettingPassword);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';

  const handleReset = async () => {
    if (!email.trim()) { showToast('error', 'Required', 'Please enter your email'); return; }
    if (!EMAIL_REGEX.test(email.trim())) { showToast('error', 'Invalid email', 'Enter a valid email address'); return; }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) throw error;
      // Keep auth stack active while user resets
      setResettingPassword(true);
      showToast('success', 'Code sent!', 'Check your email for the 6-digit code');
      navigation.navigate('Otp', { email: email.trim(), type: 'recovery' });
    } catch (e: any) {
      showToast('error', 'Failed', mapAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Sending reset code..." />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 32 }}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>

          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ marginBottom: 36 }}>
            <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: isDark ? '#111' : '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 30 }}>🔒</Text>
            </View>
            <Text style={{ color: textColor, fontSize: 24, fontWeight: '800' }}>Reset Password</Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 6, lineHeight: 20 }}>
              Enter your email and we'll send you a 6-digit reset code.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{ marginTop: 8 }}>
              <Button title="Send Reset Code" onPress={handleReset} loading={loading} />
            </View>
            <View style={{ marginTop: 12 }}>
              <Button title="Back to Login" onPress={() => navigation.goBack()} variant="outline" />
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
