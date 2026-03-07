import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Star, Share2, PackageSearch } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useLikeListing } from '../../../hooks/mutations/useLikeListing';
import { useFavoriteListing } from '../../../hooks/mutations/useFavoriteListing';
import { useShareListing } from '../../../hooks/mutations/useShareListing';
import { useTheme } from '../../../theme';
import type { Listing } from '../types';

interface Props {
  listing: Listing;
}

export const ListingCard = ({ listing }: Props) => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mainColor = isDark ? '#FFFFFF' : '#000000';
  const bgColor = isDark ? '#000000' : '#FFFFFF';

  const likeMutation = useLikeListing();
  const favMutation = useFavoriteListing();
  const shareMutation = useShareListing();

  const isProduct = listing.type === 'product';
  const media = listing.media || []; // Ensure it's an array
  const imageUrl = isProduct && media.length > 0 ? media[0].url : null;

  const handlePress = () => {
    const screen = isProduct ? 'ProductDetail' : 'DemandDetail';
    navigation.navigate(screen, { id: listing.id });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.card, { backgroundColor: bgColor }]}
      activeOpacity={0.95}
    >
      {isProduct && imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          placeholder={{ blurhash: 'L5H2j]00~qM{0K_3' }}
          recyclingKey={listing.id}
        />
      ) : isProduct ? (
        <View style={[styles.placeholder, { backgroundColor: mainColor }]}>
          <PackageSearch size={32} color={bgColor} />
        </View>
      ) : (
        <View style={[styles.demandPlaceholder, { backgroundColor: bgColor }]}>
          <PackageSearch size={48} color={mainColor} />
          <Text style={[styles.demandText, { color: mainColor }]}>Looking for</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.model, { color: mainColor }]}>
          {listing.model} {listing.memory && `• ${listing.memory}`}
        </Text>
        {listing.price > 0 ? (
          <Text style={[styles.price, { color: mainColor }]}>
            ₦{listing.price.toLocaleString()}
          </Text>
        ) : (
          <Text style={[styles.negotiable, { color: mainColor }]}>Price negotiable</Text>
        )}
        <View style={styles.tags}>
          {listing.usage && (
            <Text style={[styles.tag, { color: mainColor, borderColor: mainColor }]}>
              {listing.usage}
            </Text>
          )}
          {listing.conditions && listing.conditions.length > 0 && (
            <Text style={[styles.tag, { color: mainColor, borderColor: mainColor }]}>
              {listing.conditions[0]}
            </Text>
          )}
        </View>
        <Text style={[styles.lister, { color: mainColor }]}>
          {listing.lister_name}
          {listing.shop_name && ` • ${listing.shop_name}`}
        </Text>
        <View style={styles.interactions}>
          <TouchableOpacity onPress={() => likeMutation.mutate({ listingId: listing.id })} style={styles.btn}>
            <Heart size={20} color={mainColor} fill={listing.user_liked ? mainColor : 'none'} />
            <Text style={[styles.count, { color: mainColor }]}>{listing.like_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => favMutation.mutate({ listingId: listing.id })} style={styles.btn}>
            <Star size={20} color={mainColor} fill={listing.user_favorited ? mainColor : 'none'} />
            <Text style={[styles.count, { color: mainColor }]}>{listing.favorite_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareMutation.mutate({ listingId: listing.id })} style={styles.btn}>
            <Share2 size={20} color={mainColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  image: { width: '100%', height: 190 },
  placeholder: {
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demandPlaceholder: {
    width: '100%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  demandText: { marginTop: 10, fontSize: 15, fontWeight: '600' },
  content: { padding: 16 },
  model: { fontSize: 19, fontWeight: '700' },
  price: { fontSize: 26, fontWeight: '700', marginTop: 4 },
  negotiable: { fontSize: 15, marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  tag: {
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  lister: { fontSize: 15, marginTop: 14 },
  interactions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  count: { fontSize: 15, fontWeight: '600' },
});