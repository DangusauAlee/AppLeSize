import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '../components/ui/ScreenLayout';
import { LogoHeader } from '../components/ui/LogoHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';
import { styles } from './styles';
// import logo from '../../assets/logo.png';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) showToast(error.message, 'error');
    else {
      showToast('Account created! You can now sign in.', 'success');
      navigation.navigate('SignIn' as never);
    }
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
              placeholder="Password (min 6)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              loading={loading}
              type="secondary"  // changed to secondary
              style={{ marginBottom: 12 }}
            />
            <Button
              title="Back to Sign In"
              onPress={() => navigation.navigate('SignIn' as never)}
              type="secondary"  // changed to secondary
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};
