import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../theme';
import RootNavigator from './RootNavigator';

const AppNavigator = () => {
  const { theme } = useTheme();

  const navigationTheme = {
    dark: theme === 'dark',
    colors: {
      primary: theme === 'dark' ? '#C0C0C0' : '#000000',
      background: theme === 'dark' ? '#000000' : '#FFFFFF',
      card: theme === 'dark' ? '#000000' : '#FFFFFF',
      text: theme === 'dark' ? '#C0C0C0' : '#000000',
      border: theme === 'dark' ? '#C0C0C0' : '#000000',
      notification: '#C0C0C0',
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '600' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
    },
  };

  return (
    <NavigationContainer
      theme={navigationTheme}
      documentTitle={{
        formatter: (options, route) => {
          const screenTitle = options?.title ?? route?.name;
          return screenTitle ? `Applesize - ${screenTitle}` : 'Applesize';
        },
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
