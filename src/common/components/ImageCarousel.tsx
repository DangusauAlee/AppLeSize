import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, height = 200 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { colorScheme } = useColorScheme();

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={{ height }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: screenWidth, height }}
            resizeMode="cover"
          />
        )}
      />
      {images.length > 1 && (
        <View className="absolute bottom-2 flex-row justify-center w-full">
          {images.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === activeIndex
                  ? 'bg-brand-black dark:bg-brand-silver'
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ImageCarousel;
