import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { colors, spacing } from '../../theme';

interface LogoHeaderProps {
  title: string;
  subtitle?: string;
  logoSource?: ImageSourcePropType;
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ title, subtitle, logoSource }) => {
  return (
    <View style={styles.container}>
      {logoSource ? (
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      ) : (
        <View style={styles.logoPlaceholder} />
      )}
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.sm,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.surface,
    borderRadius: 40,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
