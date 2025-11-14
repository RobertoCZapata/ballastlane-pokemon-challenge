/**
 * Use Case: Get Pokemon Detail
 * Handles the business logic for retrieving detailed Pokemon information
 */

import { PokemonRepository } from '../repositories/PokemonRepository';
import { Pokemon } from '../entities/Pokemon';

export class GetPokemonDetailUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute(id: number): Promise<Pokemon> {
    if (id <= 0) {
      throw new Error('Invalid Pokemon ID');
    }
    return this.pokemonRepository.getPokemonById(id);
  }
}
