import { StyleSheet } from 'react-native';
import { spacing } from '../theme';

export const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  form: {
    width: '100%',
  },
  buttonSpacer: {
    height: spacing.md, // Add space between buttons
  },
});
