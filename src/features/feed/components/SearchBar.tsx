import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { debounce } from 'lodash';
import { useTheme } from '../../../theme';

interface Props {
  onSearch: (query: string) => void;
  onFilterPress: () => void;
}

export const SearchBar = ({ onSearch, onFilterPress }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const mainColor = isDark ? '#FFFFFF' : '#000000';
  const bgColor = isDark ? '#000000' : '#FFFFFF';

  const debouncedSearch = useCallback(debounce((q: string) => onSearch(q), 300), [onSearch]);

  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor: bgColor, borderColor: mainColor }]}>
        <Search size={20} color={mainColor} />
        <TextInput
          style={[styles.input, { color: mainColor }]}
          placeholder="Search products or demands..."
          placeholderTextColor={mainColor}
          value={query}
          onChangeText={handleChange}
        />
      </View>
      <TouchableOpacity
        onPress={onFilterPress}
        style={[styles.filterBtn, { backgroundColor: bgColor, borderColor: mainColor }]}
      >
        <SlidersHorizontal size={20} color={mainColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
