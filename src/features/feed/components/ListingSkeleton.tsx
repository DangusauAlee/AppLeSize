import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../../../theme';

export const ListingSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#000000' : '#FFFFFF';
  const mainColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <MotiView
      style={[styles.skeletonCard, { backgroundColor: bgColor }]}
      from={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 800, loop: true }}
    >
      <MotiView style={[styles.imagePlaceholder, { backgroundColor: mainColor }]} />
      <View style={styles.content}>
        <MotiView style={[styles.line, { backgroundColor: mainColor, width: '75%' }]} />
        <MotiView style={[styles.line, { backgroundColor: mainColor, width: '45%' }]} />
        <View style={styles.interactionRow}>
          <MotiView style={[styles.smallLine, { backgroundColor: mainColor }]} />
          <MotiView style={[styles.smallLine, { backgroundColor: mainColor }]} />
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 190,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  line: {
    height: 18,
    borderRadius: 999,
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  smallLine: {
    height: 14,
    width: 40,
    borderRadius: 999,
  },
});
