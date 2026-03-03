import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onClear,
  placeholder = 'Search...',
  autoFocus = false,
  debounceMs = 300,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<TextInput>(null); // fixed: added null
  const expandAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: internalValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [internalValue]);

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChangeText(text);
      if (onSearch && text.length > 2) onSearch();
    }, debounceMs);
  };

  const handleClear = () => {
    setInternalValue('');
    onChangeText('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={internalValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      {internalValue.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
      {onSearch && internalValue.length > 2 && (
        <Animated.View style={[styles.searchButton, { opacity: expandAnim }]}>
          <TouchableOpacity onPress={onSearch}>
            <Ionicons name="arrow-forward-circle" size={32} color={colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    height: 50,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    marginLeft: spacing.xs,
  },
});
