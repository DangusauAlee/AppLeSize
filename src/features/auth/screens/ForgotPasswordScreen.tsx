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

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

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
              />
            }
          />
          <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            Reset Password
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8 }}>
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

        <View style={{ marginTop: 16 }}>
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;
