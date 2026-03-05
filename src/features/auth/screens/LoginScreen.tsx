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

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('error', 'Error', 'Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showToast('success', 'Welcome back!');
    } catch (error: any) {
      showToast('error', 'Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Logging in..." />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={
              <Ionicons
                name="log-in"
                size={48}
                color={theme === 'dark' ? '#C0C0C0' : '#000000'}
              />
            }
          />
          <Text className="text-2xl font-bold text-brand-black dark:text-brand-silver mt-4">
            Welcome Back
          </Text>
          <Text className="text-brand-black/70 dark:text-brand-silver/70 text-center mt-2">
            Sign in to continue swapping
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

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          className="self-end mb-4"
        >
          <Text className="text-brand-black/60 dark:text-brand-silver/60 text-sm">
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Button
          title="Log In"
          onPress={handleLogin}
          loading={loading}
          className="mt-2"
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-brand-black/60 dark:text-brand-silver/60">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-brand-black dark:text-brand-silver font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
