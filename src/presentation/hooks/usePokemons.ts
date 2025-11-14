/**
 * usePokemons Hook
 * Manages Pokemon list fetching with pagination, search, and sort
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { PokemonListResponse } from '@/core/entities/Pokemon';
import { SortField, SortOrder } from '@/core/entities/ApiResponse';

interface UsePokemonsParams {
  limit?: number;
  search?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export function usePokemons(params: UsePokemonsParams = {}) {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const limit = params.limit || 20;
  const search = params.search || '';
  const sortBy = params.sortBy;
  const sortOrder = params.sortOrder || 'asc';

  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (search) {
        queryParams.append('search', search);
      }

      if (sortBy) {
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', sortOrder);
      }

      const response = await fetch(`/api/pokemons?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch Pokemon');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      console.error('Error fetching Pokemon:', err);
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset, search, sortBy, sortOrder]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const nextPage = () => {
    if (data?.next) {
      setOffset(offset + limit);
    }
  };

  const previousPage = () => {
    if (data?.previous && offset > 0) {
      setOffset(Math.max(0, offset - limit));
    }
  };

  const goToPage = (page: number) => {
    setOffset(page * limit);
  };

  const resetPagination = () => {
    setOffset(0);
  };

  return {
    pokemons: data?.results || [],
    count: data?.count || 0,
    isLoading,
    error,
    nextPage,
    previousPage,
    goToPage,
    resetPagination,
    hasNext: !!data?.next,
    hasPrevious: !!data?.previous,
    currentPage: Math.floor(offset / limit),
    totalPages: data ? Math.ceil(data.count / limit) : 0,
  };
}
