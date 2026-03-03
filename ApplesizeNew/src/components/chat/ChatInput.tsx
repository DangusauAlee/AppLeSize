import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface ChatInputProps {
  onSend: (text: string) => void;
  onAttach?: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onAttach,
  placeholder = 'Message...',
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (text.trim().length === 0) return;
    onSend(text);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      {onAttach && (
        <TouchableOpacity onPress={onAttach} style={styles.attachButton}>
          <Ionicons name="attach" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
        />
      </View>
      <TouchableOpacity
        onPress={handleSend}
        style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]}
        disabled={!text.trim()}
      >
        <Ionicons name="send" size={20} color={text.trim() ? colors.primary : colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  attachButton: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    maxHeight: 100,
  },
  input: {
    color: colors.text,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
