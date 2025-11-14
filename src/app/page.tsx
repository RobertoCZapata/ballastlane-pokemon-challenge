/**
 * Home Page - Pokemon List
 * Main page showing paginated Pokemon list with search and sort
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PokemonCard } from '@/presentation/components/PokemonCard';
import { usePokemons } from '@/presentation/hooks/usePokemons';
import { useAuth } from '@/presentation/hooks/useAuth';
import { SortField, SortOrder } from '@/core/entities/ApiResponse';

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('number');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const {
    pokemons,
    count,
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
    limit: 20,
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
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    resetPagination();
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pokémon App
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
              aria-label="Logout from application"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {/* Search and Sort Controls */}
        <section aria-label="Pokemon filters and search" className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <label htmlFor="pokemon-search" className="sr-only">
              Search Pokemon
            </label>
            <input
              id="pokemon-search"
              type="search"
              placeholder="Search Pokemon by name or number..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900"
              aria-label="Search Pokemon by name or number"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute left-3 top-3.5 text-gray-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          {/* Sort Controls */}
          <nav aria-label="Sort controls" className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 self-center font-medium">
              Sort by:
            </span>
            <button
              onClick={() => handleSortChange('name')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-pressed={sortBy === 'name'}
              aria-label={`Sort by name ${sortBy === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : ''}`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('number')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'number'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-pressed={sortBy === 'number'}
              aria-label={`Sort by number ${sortBy === 'number' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : ''}`}
            >
              Number {sortBy === 'number' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </nav>

          {/* Results Count */}
          <p className="text-sm text-gray-600" role="status" aria-live="polite">
            Showing {pokemons.length} of {count} Pokemon
          </p>
        </section>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 h-48" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pokemon Grid */}
        {!isLoading && pokemons.length > 0 && (
          <section aria-label="Pokemon gallery" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </section>
        )}

        {/* No Results */}
        {!isLoading && pokemons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Pokemon found</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && pokemons.length > 0 && (
          <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={previousPage}
              disabled={!hasPrevious}
              className="px-4 py-2 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Go to previous page"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700" aria-current="page">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="px-4 py-2 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
