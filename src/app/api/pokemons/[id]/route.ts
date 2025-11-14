/**
 * API Route: GET /api/pokemons/[id]
 * Returns detailed information about a specific Pokemon
 */

import { NextRequest, NextResponse } from 'next/server';
import { GetPokemonDetailUseCase } from '@/core/usecases/GetPokemonDetail';
import { PokeApiClient } from '@/infrastructure/api/PokeApiClient';

const pokeApiClient = new PokeApiClient();
const getPokemonDetailUseCase = new GetPokemonDetailUseCase(pokeApiClient);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid Pokemon ID',
        },
        { status: 400 }
      );
    }

    // Execute use case
    const pokemon = await getPokemonDetailUseCase.execute(id);

    return NextResponse.json(
      {
        success: true,
        data: pokemon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get pokemon detail error:', error);

    if (error instanceof Error && error.message === 'Pokemon not found') {
      return NextResponse.json(
        {
          success: false,
          message: 'Pokemon not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
