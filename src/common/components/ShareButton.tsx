import React from 'react';
import { TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface ShareButtonProps {
  onPress?: () => void;
  message?: string;
  url?: string;
  size?: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onPress, message, url, size = 24 }) => {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#C0C0C0' : '#000000';

  const handleShare = async () => {
    if (onPress) {
      onPress();
    } else {
      try {
        await Share.share({
          message: message || 'Check this out on Applesize!',
          url: url,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default ShareButton;
