import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { ListingCard } from './ListingCard';
import type { Listing } from '../types';

interface Props {
  listings: Listing[];
  onEndReached: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const ListingGrid = ({
  listings,
  onEndReached,
  refreshing,
  onRefresh,
  isLoading,
}: Props) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 2;
  const itemSize = width / numColumns - 16;

  return (
    <FlashList
      data={listings}
      renderItem={({ item }) => (
        <View style={{ width: itemSize, padding: 8 }}>
          <ListingCard listing={item} />
        </View>
      )}
      numColumns={numColumns}
      estimatedItemSize={280}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      ListEmptyComponent={isLoading ? null : undefined}
    />
  );
};

const styles = StyleSheet.create({
  content: { padding: 8 },
});
