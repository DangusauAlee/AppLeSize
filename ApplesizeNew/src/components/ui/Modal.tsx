import React from 'react';
import { Modal as RNModal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from './Button';
import { colors, spacing } from '../../theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              {title && <Text style={styles.title}>{title}</Text>}
              {message && <Text style={styles.message}>{message}</Text>}
              <View style={styles.buttons}>
                {onCancel && (
                  <Button title={cancelText} onPress={onCancel} type="outline" style={styles.button} />
                )}
                {onConfirm && (
                  <Button title={confirmText} onPress={onConfirm} type="primary" style={styles.button} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
