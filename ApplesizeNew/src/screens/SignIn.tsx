import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '../components/ui/ScreenLayout';
import { LogoHeader } from '../components/ui/LogoHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';
import { styles as screenStyles } from './styles';
// import logo from '../../assets/logo.png'; // uncomment when you add logo

export const SignInScreen = () => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) showToast(error.message, 'error');
    else showToast('Signed in successfully!', 'success');
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={screenStyles.inner}>
          <LogoHeader title="Applesize" subtitle="Premium Phone Marketplace" />
          <View style={screenStyles.form}>
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
            <Button title="Sign In" onPress={handleSignIn} loading={loading} />
            <Button
              title="Create Account"
              onPress={() => navigation.navigate('SignUp' as never)}
              type="secondary"
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};
