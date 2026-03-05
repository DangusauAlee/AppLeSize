import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../../hooks/useAuth';

type SetNewPasswordNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SetNewPassword'>;

const SetNewPasswordScreen = () => {
  const navigation = useNavigation<SetNewPasswordNavigationProp>();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { theme } = useTheme();
  const { setResettingPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

  useEffect(() => {
    return () => {
      setResettingPassword(false);
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      showToast('error', 'Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      showToast('error', 'Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      showToast('error', 'Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      showToast('success', 'Password updated!', 'Please log in with your new password');
      
      // Sign out to force login with new password
      await supabase.auth.signOut();
      
      // Clear flag and navigate to login
      setResettingPassword(false);
      navigation.navigate('Login');
    } catch (error: any) {
      showToast('error', 'Update failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Updating password..." />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={
              <Ionicons
                name="lock-closed"
                size={48}
              />
            }
          />
          <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            Set New Password
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8 }}>
            Enter your new password for{'\n'}{email}
          </Text>
        </View>

        <Input
          label="New Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          secureTextEntry
          autoCapitalize="none"
        />

        <Input
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••"
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          title="Update Password"
          onPress={handleUpdatePassword}
          loading={loading}
          className="mt-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default SetNewPasswordScreen;
