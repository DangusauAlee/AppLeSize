import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../../../theme';

interface Props {
  tabs: [string, string];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const TabSwitcher = ({ tabs, activeTab, onTabChange }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mainColor = isDark ? '#FFFFFF' : '#000000';
  const bgColor = isDark ? '#000000' : '#FFFFFF';

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor: mainColor }]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(index)}
          style={styles.tab}
          activeOpacity={0.95}
        >
          {activeTab === index && (
            <MotiView
              from={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              style={[styles.activeBackground, { backgroundColor: mainColor }]}
            />
          )}
          <Text
            style={[
              styles.tabText,
              { color: activeTab === index ? bgColor : mainColor },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 4,
    borderRadius: 999,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    position: 'relative',
  },
  activeBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    zIndex: 10,
  },
});
