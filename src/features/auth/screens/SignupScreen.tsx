import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      showToast('success', 'Success!', 'Check your email for the verification code');
      navigation.navigate('Otp', { email });
    } catch (error: any) {
      showToast('error', 'Signup failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Creating account..." />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={
              <Ionicons
                name="person-add"
                size={48}
                // color overridden by IconWithHighlight
              />
            }
          />
          <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            Create Account
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8 }}>
            Sign up to start swapping
          </Text>
        </View>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          loading={loading}
          className="mt-4"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
          <Text style={{ color: mutedColor }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: textColor, fontWeight: '600' }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignupScreen;
