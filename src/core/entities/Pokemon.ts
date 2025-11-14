/**
 * Domain Entity: Pokemon
 * Represents a Pokemon with all its attributes
 */

export interface PokemonSprite {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
    dream_world?: {
      front_default: string | null;
    };
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

/**
 * Complete Pokemon entity with all details
 */
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  forms: PokemonForm[];
  types: PokemonType[];
  stats: PokemonStat[];
}

/**
 * Simplified Pokemon for list view
 */
export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}

/**
 * Paginated Pokemon list response
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
