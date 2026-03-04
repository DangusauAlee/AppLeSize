import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scroll = false, className = '' }) => {
  const { colorScheme } = useColorScheme();
  const bgClass = colorScheme === 'dark' ? 'bg-black' : 'bg-white';

  if (scroll) {
    return (
      <SafeAreaView className={`flex-1 ${bgClass}`}>
        <ScrollView
          className={`flex-1 px-4 ${className}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${bgClass} px-4 ${className}`}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
