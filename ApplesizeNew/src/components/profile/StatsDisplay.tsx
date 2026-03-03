import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsDisplayProps {
  stats: StatItem[];
  columns?: 2 | 3;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, columns = 3 }) => {
  return (
    <View style={[styles.container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {stats.map((stat, index) => (
        <View
          key={index}
          style={[
            styles.statItem,
            { width: `${100 / columns}%` },
          ]}
        >
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statValue: {
    ...typography.heading,
    fontSize: 20,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
  },
});
