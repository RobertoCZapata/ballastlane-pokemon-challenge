/**
 * Home Page - Pokemon List (Figma Design)
 * Main page following exact Figma specifications
 */

'use client';

import { useState, useEffect } from 'react';
import { PokemonCard } from '@/presentation/components/PokemonCard';
import { usePokemons } from '@/presentation/hooks/usePokemons';
import { SortField, SortOrder } from '@/core/entities/ApiResponse';
import { colors, typography } from '@/lib/theme';
import { Pokeball, SearchIcon } from '@/icons';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('number');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const {
    pokemons,
    isLoading,
    error,
    nextPage,
    previousPage,
    hasNext,
    hasPrevious,
    currentPage,
    totalPages,
    resetPagination,
  } = usePokemons({
    search,
    sortBy,
    sortOrder,
    limit: 21, // 3x7 grid like Figma
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      resetPagination();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, resetPagination]);

  const handleSortChange = (field: SortField) => {
    setSortBy(field);
    setSortOrder('asc');
    setShowSortMenu(false);
    resetPagination();
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearch('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header - Figma Red */}
      <header
        className="sticky top-0 z-10 shadow-md"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <Pokeball width={24} height={24} className="text-white" />
            <h1
              className="font-bold text-white"
              style={{
                fontSize: typography.headline.fontSize,
                lineHeight: typography.headline.lineHeight,
                fontWeight: typography.headline.fontWeight,
              }}
            >
              Pokédex
            </h1>
          </div>

          {/* Search Bar with Sort Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
            <label htmlFor="pokemon-search" className="sr-only">
              Search Pokemon
            </label>
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon width={20} height={20} style={{ color: colors.primary }} />
            </div>
            <input
              id="pokemon-search"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-3 pl-12 pr-12 rounded-full bg-white shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Search Pokemon by name or number"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            </div>

            {/* Sort Button */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Sort options"
                style={{ color: colors.primary, fontSize: '20px', lineHeight: '1' }}
              >
                #
              </button>

              {/* Sort Dropdown */}
              {showSortMenu && (
                <div
                  className="absolute right-0 mt-2 shadow-xl z-20 p-1"
                  style={{
                    backgroundColor: colors.primary,
                    width: '113px',
                    borderRadius: '12px',
                  }}
                >
                  {/* Red header with "Sort by:" */}
                  <div className="px-4 pt-4 pb-2">
                    <h3 className="text-sm font-bold text-white">
                      Sort by:
                    </h3>
                  </div>

                  {/* White content area */}
                  <div className="bg-white mx-1 mb-1 px-1 py-1 space-y-4" style={{ borderRadius: '8px' }}>
                    <button
                      onClick={() => handleSortChange('number')}
                      className="w-full text-left flex items-center gap-2 px-3 py-2"
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        sortBy === 'number' ? 'border-red-600' : 'border-gray-300'
                      }`}>
                        {sortBy === 'number' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                        )}
                      </div>
                      <span className={`text-sm whitespace-nowrap ${sortBy === 'number' ? 'font-semibold' : 'font-normal'}`} style={{ color: colors.dark }}>
                        Number
                      </span>
                    </button>
                    <button
                      onClick={() => handleSortChange('name')}
                      className="w-full text-left flex items-center gap-2 px-3 py-2"
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        sortBy === 'name' ? 'border-red-600' : 'border-gray-300'
                      }`}>
                        {sortBy === 'name' && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                        )}
                      </div>
                      <span className={`text-sm whitespace-nowrap ${sortBy === 'name' ? 'font-semibold' : 'font-normal'}`} style={{ color: colors.dark }}>
                        Name
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6" role="main">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 aspect-square" />
                <div className="p-2">
                  <div className="h-3 bg-gray-200 rounded mb-1" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pokemon Grid - 3 columns like Figma */}
        {!isLoading && pokemons.length > 0 && (
          <section aria-label="Pokemon gallery" className="grid grid-cols-3 gap-2">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </section>
        )}

        {/* No Results */}
        {!isLoading && pokemons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No Pokemon found</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && pokemons.length > 0 && totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={previousPage}
              disabled={!hasPrevious}
              className="px-4 py-2 bg-white rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              style={{ color: colors.dark }}
              aria-label="Go to previous page"
            >
              Previous
            </button>
            <span className="px-4 py-2" style={{ color: colors.medium }}>
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="px-4 py-2 bg-white rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              style={{ color: colors.dark }}
              aria-label="Go to next page"
            >
              Next
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}
