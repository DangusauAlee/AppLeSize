import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/shared/theme';

interface LogoHeaderProps {
  title: string;
  subtitle?: string;
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="phone-portrait-outline" size={80} color={colors.primary} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
