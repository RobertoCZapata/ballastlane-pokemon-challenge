/**
 * usePokemonDetail Hook
 * Fetches detailed information about a specific Pokemon
 */

'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/core/entities/Pokemon';

export function usePokemonDetail(id: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/pokemons/${id}`);

        if (!response.ok) {
          throw new Error('Pokemon not found');
        }

        const result = await response.json();

        if (result.success) {
          setPokemon(result.data);
        } else {
          setError(result.message || 'Failed to fetch Pokemon');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error');
        console.error('Error fetching Pokemon detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return { pokemon, isLoading, error };
}
