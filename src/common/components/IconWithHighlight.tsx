import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';

interface IconWithHighlightProps {
  icon: React.ReactNode;
  size?: number;
}

const IconWithHighlight: React.FC<IconWithHighlightProps> = ({ icon, size = 48 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Light theme: white circular background with deep shadow
  if (isDark) {
    return <>{icon}</>;
  }

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 12,
      }}
    >
      {icon}
    </View>
  );
};

export default IconWithHighlight;
