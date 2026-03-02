import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
