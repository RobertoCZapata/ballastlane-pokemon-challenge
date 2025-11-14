/**
 * Pokemon Card Component (Figma Design)
 * Compact card design matching Figma specifications
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '@/core/entities/Pokemon';
import { colors } from '@/lib/theme';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article>
      <Link
        href={`/pokemon/${pokemon.id}`}
        aria-label={`View details for ${pokemon.name}, number ${pokemon.id}`}
      >
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer">
          {/* Image Section */}
          <figure className="relative bg-gray-50 aspect-square flex items-center justify-center p-2">
            <Image
              src={pokemon.imageUrl}
              alt={`${pokemon.name} official artwork`}
              width={80}
              height={80}
              className="object-contain"
              loading="lazy"
            />
            {/* Pokemon Number Badge */}
            <div
              className="absolute top-1 right-1 text-xs font-semibold px-2 py-0.5 rounded"
              style={{ color: colors.medium, fontSize: '10px' }}
            >
              #{pokemon.id.toString().padStart(4, '0')}
            </div>
          </figure>

          {/* Info Section */}
          <div className="p-2 text-center">
            <h2
              className="text-xs font-semibold capitalize truncate"
              style={{ color: colors.dark }}
            >
              {pokemon.name}
            </h2>
          </div>
        </div>
      </Link>
    </article>
  );
}
