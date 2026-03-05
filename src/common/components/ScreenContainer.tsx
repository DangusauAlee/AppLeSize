import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '../../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scroll = false, className = '' }) => {
  const { theme } = useTheme();
  const backgroundColor = theme === 'dark' ? '#000000' : '#F0F0F0'; // Very light silver

  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ScrollView
          style={{ flex: 1, backgroundColor }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className={className}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} className={className}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
