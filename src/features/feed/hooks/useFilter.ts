import { useState, useCallback } from 'react';
import type { SearchFilters } from '../types';

export const useFilter = () => {
  const [filters, setFilters] = useState<SearchFilters>({});

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { filters, updateFilter, resetFilters };
};