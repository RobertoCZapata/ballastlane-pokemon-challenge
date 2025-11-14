/**
 * Use Case: Get Pokemon List
 * Handles the business logic for retrieving a paginated list of Pokemon
 */

import { PokemonRepository } from '../repositories/PokemonRepository';
import { PokemonListResponse } from '../entities/Pokemon';
import { SearchParams } from '../entities/ApiResponse';

export class GetPokemonListUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute(params: SearchParams): Promise<PokemonListResponse> {
    return this.pokemonRepository.getPokemons(params);
  }
}
