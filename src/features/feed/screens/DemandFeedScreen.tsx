import React, { useState } from 'react';
import { View } from 'react-native';
import { useFeed } from '../hooks/useFeed';
import { useSearch } from '../hooks/useSearch';
import { useFilter } from '../hooks/useFilter';
import { ListingGrid } from '../components/ListingGrid';
import { SearchBar } from '../components/SearchBar';
import { FilterModal } from '../components/FilterModal';
import { EmptyFeed } from '../components/EmptyFeed';
import { ListingSkeleton } from '../components/ListingSkeleton';

export const DemandFeedScreen = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { filters, updateFilter, resetFilters } = useFilter();

  const feedQuery = useFeed('demand');
  const searchEnabled = !!searchQuery || Object.keys(filters).length > 0;
  const searchQueryResult = useSearch({ ...filters, query: searchQuery }, searchEnabled);

  const listings = searchEnabled
    ? searchQueryResult.data?.pages.flatMap((p) => p.listings) || []
    : feedQuery.data?.pages.flatMap((p) => p.listings) || [];

  const loading = feedQuery.isLoading || searchQueryResult.isLoading;
  const isRefreshing = feedQuery.isFetching || searchQueryResult.isFetching;

  const handleEndReached = () => {
    if (searchEnabled) {
      if (searchQueryResult.hasNextPage && !searchQueryResult.isFetchingNextPage) {
        searchQueryResult.fetchNextPage();
      }
    } else {
      if (feedQuery.hasNextPage && !feedQuery.isFetchingNextPage) {
        feedQuery.fetchNextPage();
      }
    }
  };

  const handleRefresh = () => {
    searchEnabled ? searchQueryResult.refetch() : feedQuery.refetch();
  };

  const handleApplyFilters = (newFilters: any) => {
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] !== undefined) updateFilter(key as any, newFilters[key]);
    });
    setFilterVisible(false);
  };

  if (loading && listings.length === 0) {
    return (
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        {[1, 2, 3].map((i) => <ListingSkeleton key={i} />)}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={setSearchQuery} onFilterPress={() => setFilterVisible(true)} />
      <ListingGrid
        listings={listings}
        onEndReached={handleEndReached}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        isLoading={loading}
      />
      {listings.length === 0 && !loading && <EmptyFeed message="No matching demands found" />}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </View>
  );
};
