import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/shared/components/ui/ScreenLayout';
import { LogoHeader } from '@/shared/components/ui/LogoHeader';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { signIn } from '../api';
import { styles } from './styles';

export const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const { error } = await signIn({ email, password });
    if (error) Alert.alert('Error', error.message);
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <LogoHeader title="Applesize" subtitle="Premium Phone Marketplace" />
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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="Sign In" onPress={handleSignIn} type="primary" />
              <Button title="Create Account" onPress={() => navigation.navigate('SignUp' as never)} type="secondary" />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};