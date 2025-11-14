/**
 * PokeAPI Client
 * Handles all HTTP requests to the PokeAPI
 */

import { Pokemon, PokemonListItem, PokemonListResponse } from '@/core/entities/Pokemon';
import { PokemonRepository } from '@/core/repositories/PokemonRepository';
import { SearchParams } from '@/core/entities/ApiResponse';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeApiClient implements PokemonRepository {
  private baseUrl: string;

  constructor(baseUrl: string = POKEAPI_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Extract Pokemon ID from URL
   */
  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/pokemon\/(\d+)\//);
    return matches ? parseInt(matches[1], 10) : 0;
  }

  /**
   * Get Pokemon image URL
   */
  private getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  /**
   * Fetch all Pokemon and apply filters locally
   * This is necessary because PokeAPI doesn't support search or sorting
   */
  async getPokemons(params: SearchParams): Promise<PokemonListResponse> {
    try {
      const { pagination, sort, query } = params;

      // Fetch a large batch to enable search and sort
      // PokeAPI has ~1000 Pokemon, we'll fetch enough to cover most cases
      const limit = 1500;
      const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=0`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`PokeAPI error: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform results to include ID and image
      let results: PokemonListItem[] = data.results.map((pokemon: { name: string; url: string }) => {
        const id = this.extractIdFromUrl(pokemon.url);
        return {
          id,
          name: pokemon.name,
          url: pokemon.url,
          imageUrl: this.getPokemonImageUrl(id),
        };
      });

      // Apply search filter
      if (query && query.trim() !== '') {
        const searchLower = query.toLowerCase().trim();
        results = results.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchLower) ||
          pokemon.id.toString().includes(searchLower)
        );
      }

      // Apply sorting
      if (sort) {
        results.sort((a, b) => {
          let comparison = 0;

          if (sort.field === 'name') {
            comparison = a.name.localeCompare(b.name);
          } else if (sort.field === 'number') {
            comparison = a.id - b.id;
          }

          return sort.order === 'desc' ? -comparison : comparison;
        });
      }

      // Apply pagination
      const total = results.length;
      const start = pagination.offset;
      const end = start + pagination.limit;
      const paginatedResults = results.slice(start, end);

      // Calculate next and previous
      const hasNext = end < total;
      const hasPrevious = start > 0;

      return {
        count: total,
        next: hasNext ? `offset=${end}&limit=${pagination.limit}` : null,
        previous: hasPrevious ? `offset=${Math.max(0, start - pagination.limit)}&limit=${pagination.limit}` : null,
        results: paginatedResults,
      };
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw new Error('Failed to fetch Pokemon list');
    }
  }

  /**
   * Get detailed Pokemon information by ID
   */
  async getPokemonById(id: number): Promise<Pokemon> {
    try {
      const url = `${this.baseUrl}/pokemon/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokemon not found');
        }
        throw new Error(`PokeAPI error: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Pokemon;
    } catch (error) {
      console.error(`Error fetching Pokemon ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get detailed Pokemon information by name
   */
  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const url = `${this.baseUrl}/pokemon/${name.toLowerCase()}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokemon not found');
        }
        throw new Error(`PokeAPI error: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Pokemon;
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw error;
    }
  }
}
