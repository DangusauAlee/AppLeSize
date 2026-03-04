import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import ScreenContainer from '../../../common/components/ScreenContainer';
import SegmentedControl from '../../../common/components/SegmentedControl';
import ProductCard from '../../../common/components/ProductCard';
import Skeleton from '../../../common/components/Skeleton';
import EmptyState from '../../../common/components/EmptyState';
import { useFeed } from '../hooks/useFeed';
import { FeedItem } from '../types';

const FeedMainScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const feedType = selectedIndex === 0 ? 'products' : 'demands';
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch, isRefetching } = useFeed(feedType);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: FeedItem }) => (
    <ProductCard
      id={item.id}
      title={item.title}
      price={item.price}
      images={item.images}
      isSaved={item.isSaved}
      onSave={() => console.log('Save', item.id)}
      onShare={() => console.log('Share', item.id)}
      onPress={() => console.log('Press', item.id)}
      badge={item.urgent ? 'urgent' : null}
    />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#C0C0C0" />
      </View>
    );
  };

  const renderSkeleton = () => (
    <View className="px-4">
      {[1, 2, 3].map((i) => (
        <View key={i} className="mb-4">
          <Skeleton width="100%" height={200} borderRadius={8} />
          <View className="mt-2">
            <Skeleton width="60%" height={20} borderRadius={4} />
            <Skeleton width="30%" height={16} borderRadius={4} className="mt-2" />
          </View>
        </View>
      ))}
    </View>
  );

  if (status === 'pending') {
    return (
      <ScreenContainer>
        <View className="px-4 pt-4">
          <SegmentedControl
            options={['Products', 'Demands']}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </View>
        {renderSkeleton()}
      </ScreenContainer>
    );
  }

  const allItems = data?.pages.flat() || [];

  return (
    <ScreenContainer>
      <View className="px-4 pt-4">
        <SegmentedControl
          options={['Products', 'Demands']}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
      <FlatList
        data={allItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <EmptyState
            title={`No ${feedType} found`}
            message="Check back later or create a new listing"
          />
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default FeedMainScreen;
