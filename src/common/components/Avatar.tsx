import React from 'react';
import { Image, View } from 'react-native';
import Badge from './Badge';

interface AvatarProps {
  source?: { uri: string } | null;
  size?: 'sm' | 'md' | 'lg';
  badge?: 'gold' | 'silver' | null;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const Avatar: React.FC<AvatarProps> = ({ source, size = 'md', badge, className = '' }) => {
  return (
    <View className="relative">
      {source ? (
        <Image source={source} className={`${sizeMap[size]} rounded-full ${className}`} />
      ) : (
        <View className={`${sizeMap[size]} rounded-full bg-brand-silver dark:bg-brand-black items-center justify-center ${className}`}>
          {/* Placeholder icon could be added here */}
        </View>
      )}
      {badge && (
        <View className="absolute -bottom-1 -right-1">
          <Badge type={badge} />
        </View>
      )}
    </View>
  );
};

export default Avatar;
