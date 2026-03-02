import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
});
