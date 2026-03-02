import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/shared/components/ui/ScreenLayout';
import { LogoHeader } from '@/shared/components/ui/LogoHeader';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { signUp } from '../api';
import { styles } from './styles';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    const { error } = await signUp({ email, password });
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Success', 'Account created! You can now sign in.');
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <LogoHeader title="Applesize" subtitle="Join the Premium Marketplace" />
            <View style={styles.form}>
              <Input
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Input
                icon="lock-closed-outline"
                placeholder="Password (min 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Sign Up" onPress={handleSignUp} type="primary" />
              <Button title="Back to Sign In" onPress={() => navigation.navigate('SignIn' as never)} type="secondary" />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};