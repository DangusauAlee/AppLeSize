import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
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
import { NIGERIAN_PHONE_REGEX, EMAIL_REGEX, mapAuthError } from '../utils/validation';
import type { AuthStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type LoginMode = 'email' | 'phone';

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const setResettingPassword = useAuthStore((s) => s.setResettingPassword);

  const [mode, setMode] = useState<LoginMode>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const textColor = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';
  const surfaceColor = isDark ? '#111111' : '#F5F5F5';
  const borderColor = isDark ? '#FFFFFF20' : '#00000020';

  // Clear reset flag when login mounts
  useEffect(() => { setResettingPassword(false); }, []);

  const switchMode = (m: LoginMode) => {
    setMode(m);
    setIdentifier('');
  };

  const validate = (): string | null => {
    if (!identifier.trim()) return mode === 'email' ? 'Email is required' : 'Phone number is required';
    if (mode === 'email' && !EMAIL_REGEX.test(identifier.trim())) return 'Enter a valid email address';
    if (mode === 'phone' && !NIGERIAN_PHONE_REGEX.test(identifier.replace(/[\s-]/g, ''))) {
      return 'Enter a valid Nigerian phone number (e.g. 08012345678)';
    }
    if (!password) return 'Password is required';
    return null;
  };

  const handleLogin = async () => {
    const err = validate();
    if (err) { showToast('error', 'Error', err); return; }

    setLoading(true);
    try {
      let email = identifier.trim();

      // Phone login: look up email from profile
      if (mode === 'phone') {
        const { data, error } = await supabase.rpc('get_email_by_phone', {
          p_phone: identifier.replace(/[\s-]/g, ''),
        });
        if (error || !data) throw new Error('No account found with this phone number.');
        email = data;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // RootNavigator detects user and switches to App automatically
    } catch (e: any) {
      showToast('error', 'Login failed', mapAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Signing in..." />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ width: 72, height: 72, borderRadius: 20, backgroundColor: textColor, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Text style={{ color: isDark ? '#000000' : '#FFFFFF', fontSize: 30, fontWeight: '900' }}>A</Text>
            </View>
            <Text style={{ color: textColor, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 }}>Welcome back</Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 4 }}>Sign in to App'lesize</Text>
          </Animated.View>

          {/* Mode toggle */}
          <Animated.View entering={FadeInDown.delay(80).duration(500)} style={{ flexDirection: 'row', backgroundColor: surfaceColor, borderRadius: 10, padding: 3, marginBottom: 20 }}>
            {(['email', 'phone'] as LoginMode[]).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => switchMode(m)}
                style={{ flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center', backgroundColor: mode === m ? textColor : 'transparent' }}
              >
                <Text style={{ color: mode === m ? (isDark ? '#000' : '#fff') : mutedColor, fontSize: 13, fontWeight: '600' }}>
                  {m === 'email' ? '✉  Email' : '📱  Phone'}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Inputs */}
          <Animated.View entering={FadeInDown.delay(160).duration(500)}>
            <Input
              label={mode === 'email' ? 'Email' : 'Phone Number'}
              value={identifier}
              onChangeText={setIdentifier}
              placeholder={mode === 'email' ? 'you@example.com' : '08012345678'}
              keyboardType={mode === 'email' ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            <View>
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                style={{ position: 'absolute', right: 14, top: 38 }}
              >
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{ alignSelf: 'flex-end', marginBottom: 20, marginTop: -8 }}
            >
              <Text style={{ color: mutedColor, fontSize: 13 }}>Forgot password?</Text>
            </TouchableOpacity>
            <Button title="Sign In" onPress={handleLogin} loading={loading} />
          </Animated.View>

          {/* Footer */}
          <Animated.View entering={FadeInDown.delay(240).duration(500)} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
            <Text style={{ color: mutedColor }}>Don't have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: textColor, fontWeight: '700' }}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
