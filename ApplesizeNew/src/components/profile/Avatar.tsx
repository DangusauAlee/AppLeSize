import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface AvatarProps {
  source?: string;
  size?: 'small' | 'medium' | 'large';
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 'medium', name }) => {
  const dimensions = {
    small: 32,
    medium: 48,
    large: 80,
  }[size];

  const getInitials = () => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={[styles.image, { width: dimensions, height: dimensions, borderRadius: dimensions / 2 }]}
      />
    );
  }

  return (
    <View style={[styles.placeholder, { width: dimensions, height: dimensions, borderRadius: dimensions / 2 }]}>
      {name ? (
        <Text style={[styles.initials, { fontSize: dimensions * 0.4 }]}>{getInitials()}</Text>
      ) : (
        <Ionicons name="person" size={dimensions * 0.6} color={colors.textSecondary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surface,
  },
  placeholder: {
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  initials: {
    color: colors.primary,
    fontWeight: '600',
  },
});
