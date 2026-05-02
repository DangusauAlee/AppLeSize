import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { getPasswordStrength, mapAuthError } from '../utils/validation';
import type { AuthStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'SetNewPassword'>;

export default function SetNewPasswordScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<any>();
  const { email } = params as { email: string };
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const setResettingPassword = useAuthStore((s) => s.setResettingPassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';
  const borderColor = isDark ? '#FFFFFF20' : '#00000020';
  const greenColor = '#22C55E';
  const redColor   = '#EF4444';

  // Clear flag on unmount
  useEffect(() => () => { setResettingPassword(false); }, []);

  const strength = getPasswordStrength(password);

  const handleUpdate = async () => {
    if (!password || !confirmPassword) { showToast('error', 'Required', 'Both fields are required'); return; }
    if (strength.score < 2) { showToast('error', 'Weak password', 'Choose a stronger password'); return; }
    if (password !== confirmPassword) { showToast('error', 'Mismatch', 'Passwords do not match'); return; }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await supabase.auth.signOut();
      setResettingPassword(false);
      showToast('success', 'Password updated!', 'Please sign in with your new password');
      navigation.navigate('Login');
    } catch (e: any) {
      showToast('error', 'Update failed', mapAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Updating password..." />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ marginBottom: 36 }}>
            <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: isDark ? '#111' : '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 30 }}>🔑</Text>
            </View>
            <Text style={{ color: textColor, fontSize: 24, fontWeight: '800' }}>Set New Password</Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 6 }}>
              Create a new password for {email}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <View>
              <Input label="New Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry={!showPassword} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={{ position: 'absolute', right: 14, top: 36 }}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
            </View>
            {password.length > 0 && (
              <View style={{ marginTop: -8, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i < strength.score ? strength.color : borderColor }} />
                  ))}
                  <Text style={{ fontSize: 11, fontWeight: '700', color: strength.color, marginLeft: 6 }}>{strength.label}</Text>
                </View>
              </View>
            )}
            <View>
              <Input label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" secureTextEntry={!showConfirm} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowConfirm((v) => !v)} style={{ position: 'absolute', right: 14, top: 36 }}>
                <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
              {confirmPassword.length > 0 && (
                <Ionicons
                  name={password === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={password === confirmPassword ? greenColor : redColor}
                  style={{ position: 'absolute', right: 40, top: 38 }}
                />
              )}
            </View>
            <View style={{ marginTop: 8 }}>
              <Button title="Update Password" onPress={handleUpdate} loading={loading} />
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
