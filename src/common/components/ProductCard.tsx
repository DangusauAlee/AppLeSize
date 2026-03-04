import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ImageCarousel from './ImageCarousel';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';

interface ProductCardProps {
  id: string;
  title: string;
  price?: number;
  images: string[];
  isSaved?: boolean;
  onSave?: () => void;
  onShare?: () => void;
  onPress?: () => void;
  badge?: 'urgent' | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  images,
  isSaved = false,
  onSave,
  onShare,
  onPress,
  badge,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-black rounded-lg overflow-hidden border border-brand-black/10 dark:border-brand-silver/10 mb-4"
    >
      <ImageCarousel images={images} height={200} />
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-brand-black dark:text-brand-silver" numberOfLines={2}>
              {title}
            </Text>
            {price !== undefined && (
              <Text className="text-brand-black dark:text-brand-silver mt-1">
                ${price.toFixed(2)}
              </Text>
            )}
          </View>
          <View className="flex-row">
            {onSave && <SaveButton isSaved={isSaved} onPress={onSave} />}
            {onShare && <ShareButton onPress={onShare} />}
          </View>
        </View>
        {badge === 'urgent' && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">URGENT</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
