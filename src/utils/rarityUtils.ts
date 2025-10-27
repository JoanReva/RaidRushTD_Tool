import type { Rarity } from '../types/tower';

/**
 * Power multipliers by rarity level
 */
export const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  'Common': 1.0,
  'Good': 1.5,
  'Rare': 2.0,
  'Epic': 2.5,
  'Epic+': 2.75,
  'Legendary': 3.0,
} as const;

/**
 * Hexadecimal colors associated with each rarity
 */
export const RARITY_COLORS: Record<Rarity, string> = {
  'Common': '#9ca3af',
  'Good': '#4ade80',
  'Rare': '#60a5fa',
  'Epic': '#a78bfa',
  'Epic+': '#7c3aed',
  'Legendary': '#fbbf24',
} as const;

/**
 * Ordered list of available rarities
 */
export const RARITY_LIST: readonly Rarity[] = [
  'Common',
  'Good',
  'Rare',
  'Epic',
  'Epic+',
  'Legendary',
] as const;
