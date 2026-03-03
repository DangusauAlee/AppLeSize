import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface MessageBubbleProps {
  message: string;
  timestamp: Date;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
  avatar?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  timestamp,
  isOutgoing,
  status,
}) => {
  return (
    <View style={[styles.container, isOutgoing ? styles.outgoingContainer : styles.incomingContainer]}>
      <View style={[styles.bubble, isOutgoing ? styles.outgoingBubble : styles.incomingBubble]}>
        <Text style={[styles.message, isOutgoing ? styles.outgoingMessage : styles.incomingMessage]}>
          {message}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {isOutgoing && status && (
            <Text style={styles.status}>
              {status === 'read' ? '✓✓' : status === 'delivered' ? '✓✓' : '✓'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: spacing.md,
  },
  incomingContainer: {
    alignItems: 'flex-start',
  },
  outgoingContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    padding: spacing.sm,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  incomingBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outgoingBubble: {
    backgroundColor: colors.primary,
  },
  message: {
    ...typography.body,
    fontSize: 14,
    marginBottom: 4,
  },
  incomingMessage: {
    color: colors.text,
  },
  outgoingMessage: {
    color: colors.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timestamp: {
    ...typography.caption,
    fontSize: 10,
    marginRight: 4,
  },
  status: {
    ...typography.caption,
    fontSize: 10,
    color: colors.black,
  },
});
