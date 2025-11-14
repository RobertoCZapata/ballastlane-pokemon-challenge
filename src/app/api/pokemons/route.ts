/**
 * API Route: GET /api/pokemons
 * Returns paginated list of Pokemon with search and sort
 */

import { NextRequest, NextResponse } from 'next/server';
import { pokemonQuerySchema } from '@/lib/validation';
import { GetPokemonListUseCase } from '@/core/usecases/GetPokemonList';
import { PokeApiClient } from '@/infrastructure/api/PokeApiClient';
import { SortField, SortOrder } from '@/core/entities/ApiResponse';

const pokeApiClient = new PokeApiClient();
const getPokemonListUseCase = new GetPokemonListUseCase(pokeApiClient);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryParams = {
      limit: searchParams.get('limit') || '20',
      offset: searchParams.get('offset') || '0',
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: searchParams.get('sortOrder') || 'asc',
    };

    const validation = pokemonQuerySchema.safeParse(queryParams);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { limit, offset, search, sortBy, sortOrder } = validation.data;

    // Build search params
    const searchParamsObj = {
      query: search,
      pagination: {
        limit,
        offset,
      },
      sort: sortBy
        ? {
            field: sortBy as SortField,
            order: sortOrder as SortOrder,
          }
        : undefined,
    };

    // Execute use case
    const result = await getPokemonListUseCase.execute(searchParamsObj);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get pokemons error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
