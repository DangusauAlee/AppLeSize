import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import { supabase } from '../../../services/supabase';
import { useTheme } from '../../../theme';
import { getPasswordStrength, mapAuthError } from '../utils/validation';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';
  const borderColor = isDark ? '#FFFFFF20' : '#00000020';
  const greenColor = '#22C55E';
  const redColor   = '#EF4444';
  const strength = getPasswordStrength(newPassword);

  const handleChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('error', 'Required', 'All fields are required'); return;
    }
    if (strength.score < 2) { showToast('error', 'Weak password', 'Choose a stronger password'); return; }
    if (newPassword !== confirmPassword) { showToast('error', 'Mismatch', 'Passwords do not match'); return; }
    if (currentPassword === newPassword) { showToast('error', 'Same password', 'New password must be different'); return; }

    setLoading(true);
    try {
      // Re-authenticate first to verify old password
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('No authenticated user');
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (reAuthError) throw new Error('Current password is incorrect');
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showToast('success', 'Password changed!', 'Your password has been updated');
      navigation.goBack();
    } catch (e: any) {
      showToast('error', 'Failed', mapAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Updating password..." />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 8, marginBottom: 32 }}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>

          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ marginBottom: 32 }}>
            <Text style={{ color: textColor, fontSize: 24, fontWeight: '800' }}>Change Password</Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 4 }}>Update your account password</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <View>
              <Input label="Current Password" value={currentPassword} onChangeText={setCurrentPassword} placeholder="••••••••" secureTextEntry={!showCurrent} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowCurrent((v) => !v)} style={{ position: 'absolute', right: 14, top: 36 }}>
                <Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: borderColor, marginVertical: 8 }} />
            <View>
              <Input label="New Password" value={newPassword} onChangeText={setNewPassword} placeholder="••••••••" secureTextEntry={!showNew} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowNew((v) => !v)} style={{ position: 'absolute', right: 14, top: 36 }}>
                <Ionicons name={showNew ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
            </View>
            {newPassword.length > 0 && (
              <View style={{ marginTop: -8, marginBottom: 12, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2, 3].map((i) => (
                  <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i < strength.score ? strength.color : borderColor }} />
                ))}
                <Text style={{ fontSize: 11, fontWeight: '700', color: strength.color }}>{strength.label}</Text>
              </View>
            )}
            <View>
              <Input label="Confirm New Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" secureTextEntry={!showConfirm} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowConfirm((v) => !v)} style={{ position: 'absolute', right: 14, top: 36 }}>
                <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
              {confirmPassword.length > 0 && (
                <Ionicons name={newPassword === confirmPassword ? 'checkmark-circle' : 'close-circle'} size={20} color={newPassword === confirmPassword ? greenColor : redColor} style={{ position: 'absolute', right: 40, top: 38 }} />
              )}
            </View>
            <View style={{ marginTop: 12 }}>
              <Button title="Update Password" onPress={handleChange} loading={loading} />
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
