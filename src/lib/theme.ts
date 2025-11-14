/**
 * Design System - Based on Figma Design
 * Color palette and type styles from Pokemon App design
 */

export const colors = {
  // Identity
  primary: '#DC0A2D',

  // Grayscale
  dark: '#212121',
  medium: '#666666',
  light: '#E0E0E0',
  background: '#EFEFEF',
  white: '#FFFFFF',

  // Pokemon Types
  bug: '#A7B723',
  dark: '#75574C',
  dragon: '#7037FF',
  electric: '#F9CF30',
  fairy: '#E69EAC',
  fighting: '#C12239',
  fire: '#F57D31',
  flying: '#A891EC',
  ghost: '#70559B',
  normal: '#AAA67F',
  grass: '#74CB48',
  ground: '#DEC16B',
  ice: '#9AD6DF',
  poison: '#A43E9E',
  psychic: '#FB5584',
  rock: '#B69E31',
  steel: '#B7B9D0',
  water: '#6493EB',
} as const;

export const typography = {
  headline: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 'bold',
  },
  subtitle3: {
    fontSize: '10px',
    lineHeight: '16px',
    fontWeight: 'bold',
  },
  subtitle1: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'bold',
  },
  subtitle2: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 'bold',
  },
  body: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'normal',
  },
} as const;

// Helper function to get Pokemon type color
export function getTypeColor(type: string): string {
  const typeLower = type.toLowerCase() as keyof typeof colors;
  return colors[typeLower] || colors.normal;
}
