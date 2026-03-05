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

  const circleBackground = isDark ? '#FFFFFF' : '#000000';
  const iconColor = isDark ? '#000000' : '#FFFFFF';

  // Clone the icon element to override its color prop
  const coloredIcon = React.cloneElement(icon as React.ReactElement, { color: iconColor });

  return (
    <View
      style={{
        backgroundColor: circleBackground,
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: isDark ? '#FFFFFF' : '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 12,
      }}
    >
      {coloredIcon}
    </View>
  );
};

export default IconWithHighlight;
