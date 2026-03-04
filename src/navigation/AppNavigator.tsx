import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../theme';
import RootNavigator from './RootNavigator';

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: theme === 'dark',
        colors: {
          primary: theme === 'dark' ? '#C0C0C0' : '#000000',
          background: theme === 'dark' ? '#000000' : '#FFFFFF',
          card: theme === 'dark' ? '#000000' : '#FFFFFF',
          text: theme === 'dark' ? '#C0C0C0' : '#000000',
          border: theme === 'dark' ? '#C0C0C0' : '#000000',
          notification: '#C0C0C0',
        },
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
