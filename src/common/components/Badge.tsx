import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BadgeProps {
  type: 'gold' | 'silver';
}

const Badge: React.FC<BadgeProps> = ({ type }) => {
  const colors = {
    gold: { bg: '#FFD700', icon: 'star' },
    silver: { bg: '#C0C0C0', icon: 'star-outline' },
  };

  return (
    <View
      className="w-5 h-5 rounded-full items-center justify-center"
      style={{ backgroundColor: colors[type].bg }}
    >
      <Ionicons name={colors[type].icon as any} size={12} color="#000" />
    </View>
  );
};

export default Badge;
