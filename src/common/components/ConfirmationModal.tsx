import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Button from './Button';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white dark:bg-black rounded-lg p-6 w-4/5 max-w-sm">
          <Text className="text-xl font-bold text-brand-black dark:text-brand-silver mb-2">{title}</Text>
          <Text className="text-brand-black dark:text-brand-silver mb-6">{message}</Text>
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity onPress={onCancel} disabled={isLoading}>
              <Text className="text-brand-black dark:text-brand-silver px-4 py-2">{cancelText}</Text>
            </TouchableOpacity>
            <Button
              title={confirmText}
              onPress={onConfirm}
              loading={isLoading}
              disabled={isLoading}
              variant="primary"
              className="px-4 py-2"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
