import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, onPress, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const Component = onPress ? TouchableOpacity : View;

  const silver = '#C0C0C0';
  const black = '#000000';

  const backgroundColor = isDark ? black : silver;
  const borderColor = isDark ? silver : black;
  const shadowColor = isDark ? silver : black;

  return (
    <Component
      onPress={onPress}
      style={[
        {
          backgroundColor,
          borderRadius: 8,
          padding: 16,
          borderWidth: 1,
          borderColor,
          shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 8,
        },
      ]}
      className={className}
    >
      {children}
    </Component>
  );
};

export default Card;
