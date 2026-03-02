import React from 'react';
import { View, Text } from 'react-native';
import { ScreenLayout } from '../components/ui/ScreenLayout';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';
import { colors, spacing } from '../theme';

export const HomeScreen = () => {
  const { showToast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showToast('Signed out', 'info');
  };

  return (
    <ScreenLayout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.xl }}>
          Welcome to Applesize!
        </Text>
        <Button title="Sign Out" onPress={handleSignOut} type="secondary" />
      </View>
    </ScreenLayout>
  );
};
