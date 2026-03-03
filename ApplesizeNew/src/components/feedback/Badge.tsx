import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface BadgeProps {
  count: number;
  max?: number;
  size?: 'small' | 'medium';
  color?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  max = 99,
  size = 'medium',
  color = colors.primary,
  style,
}) => {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color },
        size === 'small' ? styles.small : styles.medium,
        style,
      ]}
    >
      <Text style={[styles.text, size === 'small' ? styles.smallText : styles.mediumText]}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  small: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
  },
  medium: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 9,
  },
  mediumText: {
    fontSize: 11,
  },
});
