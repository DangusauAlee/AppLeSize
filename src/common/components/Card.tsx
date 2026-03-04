import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, onPress, className = '' }) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`bg-white dark:bg-black rounded-lg p-4 shadow-sm border border-brand-black/10 dark:border-brand-silver/10 ${className}`}
    >
      {children}
    </Component>
  );
};

export default Card;
