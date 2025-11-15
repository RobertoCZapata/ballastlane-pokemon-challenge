/**
 * Pokemon Detail Page
 * Shows detailed information about a specific Pokemon
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { colors, getTypeColor } from '@/lib/theme';
import { BackButton } from '@/presentation/components/BackButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPokemonDetail(id: string) {
  try {
    // Use the API client directly instead of fetching from the route
    const { GetPokemonDetailUseCase } = await import('@/core/usecases/GetPokemonDetail');
    const { PokeApiClient } = await import('@/infrastructure/api/PokeApiClient');

    const pokeApiClient = new PokeApiClient();
    const getPokemonDetailUseCase = new GetPokemonDetailUseCase(pokeApiClient);

    const pokemon = await getPokemonDetailUseCase.execute(parseInt(id, 10));
    return pokemon;
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    return null;
  }
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  if (!pokemon) {
    notFound();
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getTypeColor(mainType);

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: colors.background, padding: '4px' }}>
      <div style={{ maxWidth: '360px', width: '100%' }}>
        {/* Header */}
        <header
          className="text-white relative"
          style={{
            backgroundColor: typeColor,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            paddingBottom: '80px',
            overflow: 'visible'
          }}
        >
          <div style={{ padding: '16px 8px 0 8px', overflow: 'hidden' }}>
            <div className="flex items-center justify-between mb-4">
              <BackButton />
              <span className="text-2xl font-bold">
                #{pokemon.id.toString().padStart(3, '0')}
              </span>
            </div>

            <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

            {/* Decorative circles */}
            <div
              className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: 'white' }}
            ></div>
            <div
              className="absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-10"
              style={{ backgroundColor: 'white' }}
            ></div>
          </div>

          {/* Pokemon Image - Overlapping */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center" style={{ transform: 'translateY(50%)', zIndex: 10 }}>
            <div className="relative w-64 h-64">
              <Image
                src={
                  pokemon.sprites.other?.['official-artwork']?.front_default ||
                  pokemon.sprites.front_default ||
                  ''
                }
                alt={`${pokemon.name} official artwork`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          className="pb-12"
          role="main"
          style={{ marginTop: '-8px' }}
        >
          <div
            className="bg-white shadow-xl"
            style={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              paddingTop: '140px',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingBottom: '16px'
            }}
          >
          {/* Type Badges */}
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="text-white text-sm font-semibold capitalize"
                style={{
                  backgroundColor: getTypeColor(type.type.name),
                  borderRadius: '10px',
                  padding: '2px 8px',
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* About Section */}
          <h2
            className="text-center text-xl font-bold mb-4"
            style={{ color: typeColor }}
          >
            About
          </h2>

          {/* Stats */}
          <section aria-label="Pokemon stats" className="mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: typeColor }}
            >
              Base Stats
            </h2>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className="text-sm font-semibold capitalize"
                      style={{ color: colors.medium }}
                    >
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-bold">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                        backgroundColor: typeColor,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Abilities */}
          <section aria-label="Pokemon abilities" className="mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: typeColor }}
            >
              Abilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: colors.light }}
                >
                  <h3 className="font-bold capitalize text-gray-800">
                    {ability.ability.name.replace('-', ' ')}
                  </h3>
                  {ability.is_hidden && (
                    <span className="text-xs text-gray-500">(Hidden)</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Moves */}
          <section aria-label="Pokemon moves" className="mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: typeColor }}
            >
              Moves ({pokemon.moves.length})
            </h2>
            <div className="max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {pokemon.moves.slice(0, 20).map((move) => (
                  <div
                    key={move.move.name}
                    className="px-3 py-2 rounded-lg text-sm font-medium capitalize text-center"
                    style={{
                      backgroundColor: colors.background,
                      color: colors.dark,
                    }}
                  >
                    {move.move.name.replace('-', ' ')}
                  </div>
                ))}
                {pokemon.moves.length > 20 && (
                  <div
                    className="px-3 py-2 rounded-lg text-sm font-medium text-center"
                    style={{
                      backgroundColor: colors.light,
                      color: colors.medium,
                    }}
                  >
                    +{pokemon.moves.length - 20} more
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Physical Info */}
          <section aria-label="Physical information" className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
              <p className="text-sm font-semibold" style={{ color: colors.medium }}>
                Weight
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.dark }}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
              <p className="text-sm font-semibold" style={{ color: colors.medium }}>
                Height
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.dark }}>
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}
