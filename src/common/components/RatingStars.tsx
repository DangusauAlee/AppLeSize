import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 20,
  editable = false,
  onRatingChange,
}) => {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <View className="flex-row">
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => editable && onRatingChange?.(star)}
          disabled={!editable}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? '#FFD700' : '#C0C0C0'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RatingStars;
