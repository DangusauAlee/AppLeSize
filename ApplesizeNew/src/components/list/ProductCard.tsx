import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Avatar } from '../profile/Avatar';
import { RatingStars } from '../misc/RatingStars';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  images: string[];
  seller: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  location?: string;
  createdAt: Date;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  currency = 'GH₵',
  condition,
  images,
  seller,
  location,
  createdAt,
  onPress,
}) => {
  const conditionColor = {
    'new': colors.success,
    'like-new': colors.primary,
    'good': colors.warning,
    'fair': colors.error,
  }[condition];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: images[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.price}>{currency} {price.toLocaleString()}</Text>
        </View>
        
        <View style={styles.conditionContainer}>
          <View style={[styles.conditionBadge, { backgroundColor: conditionColor }]}>
            <Text style={styles.conditionText}>{condition}</Text>
          </View>
          {location && (
            <View style={styles.location}>
              <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.seller}>
            <Avatar source={seller.avatar} size="small" />
            <Text style={styles.sellerName}>{seller.name}</Text>
            {seller.verified && (
              <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            )}
          </View>
          <Text style={styles.date}>
            {new Date(createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.heading,
    color: colors.primary,
    fontSize: 18,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  conditionBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  conditionText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...typography.caption,
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerName: {
    ...typography.caption,
    marginLeft: spacing.xs,
    marginRight: 2,
  },
  date: {
    ...typography.caption,
  },
});
