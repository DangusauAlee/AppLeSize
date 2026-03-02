import React from 'react';
import { View, Text } from 'react-native';
import { ScreenLayout } from '@/shared/components/ui/ScreenLayout';
import { Button } from '@/shared/components/ui/Button';
import { signOut } from '@/features/auth/api';
import { styles } from './styles';

export const HomeScreen = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Applesize!</Text>
        <Button title="Sign Out" onPress={handleSignOut} type="secondary" />
      </View>
    </ScreenLayout>
  );
};
