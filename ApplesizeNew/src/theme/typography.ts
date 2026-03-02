import { colors } from './colors';
export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};
