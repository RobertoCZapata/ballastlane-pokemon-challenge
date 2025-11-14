/**
 * Pokemon Card Component
 * Displays a Pokemon card with image, name, and number
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '@/core/entities/Pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer group">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-48">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width={150}
            height={150}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 capitalize text-center">
            {pokemon.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
