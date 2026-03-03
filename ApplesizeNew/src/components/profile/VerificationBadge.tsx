import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface VerificationBadgeProps {
  verified: boolean;
  type?: 'seller' | 'identity' | 'email' | 'phone';
  showLabel?: boolean;
  size?: 'small' | 'medium';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verified,
  type = 'seller',
  showLabel = false,
  size = 'medium',
}) => {
  if (!verified) return null;

  const labels = {
    seller: 'Verified Seller',
    identity: 'ID Verified',
    email: 'Email Verified',
    phone: 'Phone Verified',
  };

  const iconSize = size === 'small' ? 14 : 18;

  return (
    <View style={[styles.container, size === 'small' && styles.small]}>
      <Ionicons name="checkmark-circle" size={iconSize} color={colors.primary} />
      {showLabel && <Text style={styles.label}>{labels[type]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  small: {
    transform: [{ scale: 0.8 }],
  },
  label: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
});
