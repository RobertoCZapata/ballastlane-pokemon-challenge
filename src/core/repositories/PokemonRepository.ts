/**
 * Repository Interface: Pokemon Repository
 * Defines the contract for Pokemon data access
 */

import { Pokemon, PokemonListResponse } from '../entities/Pokemon';
import { SearchParams } from '../entities/ApiResponse';

export interface PokemonRepository {
  /**
   * Get a paginated list of Pokemon
   */
  getPokemons(params: SearchParams): Promise<PokemonListResponse>;

  /**
   * Get detailed information about a specific Pokemon
   */
  getPokemonById(id: number): Promise<Pokemon>;

  /**
   * Get detailed information about a specific Pokemon by name
   */
  getPokemonByName(name: string): Promise<Pokemon>;
}
