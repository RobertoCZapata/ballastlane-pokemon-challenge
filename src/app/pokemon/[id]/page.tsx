/**
 * Pokemon Detail Page
 * Shows detailed information about a specific Pokemon
 */

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePokemonDetail } from '@/presentation/hooks/usePokemonDetail';
import { colors, getTypeColor } from '@/lib/theme';

interface PageProps {
  params: { id: string };
}

export default function PokemonDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { pokemon, isLoading, error } = usePokemonDetail(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pokemon not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            style={{ backgroundColor: colors.primary }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getTypeColor(mainType);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header
        className="text-white relative overflow-hidden"
        style={{ backgroundColor: typeColor }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Go back to home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span className="font-semibold">Back</span>
            </button>
            <span className="text-2xl font-bold">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </div>

          <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

          <div className="flex gap-2 mb-8">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-4 py-1 rounded-full text-sm font-semibold capitalize"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pokemon Image */}
        <div className="relative flex justify-center pb-8">
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

        {/* Decorative circles */}
        <div
          className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: 'white' }}
        ></div>
        <div
          className="absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-10"
          style={{ backgroundColor: 'white' }}
        ></div>
      </header>

      {/* Content */}
      <main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12"
        role="main"
      >
        <div className="bg-white rounded-t-3xl shadow-xl p-6">
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
  );
}
