import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { supabase } from '../../../services/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      showToast('error', 'Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      showToast('success', 'Reset link sent!', 'Check your email');
      navigation.goBack();
    } catch (error: any) {
      showToast('error', 'Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Sending reset link..." />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={
              <Ionicons
                name="key"
                size={48}
                color={theme === 'dark' ? '#C0C0C0' : '#000000'}
              />
            }
          />
          <Text className="text-2xl font-bold text-brand-black dark:text-brand-silver mt-4">
            Reset Password
          </Text>
          <Text className="text-brand-black/70 dark:text-brand-silver/70 text-center mt-2">
            Enter your email to receive a reset link
          </Text>
        </View>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          title="Send Reset Link"
          onPress={handleReset}
          loading={loading}
          className="mt-4"
        />

        <Button
          title="Back to Login"
          onPress={() => navigation.goBack()}
          variant="outline"
          className="mt-2"
        />
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;
