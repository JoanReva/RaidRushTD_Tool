import type { Rarity } from '../types/tower';

/**
 * Level range configuration for each rarity tier
 */
export interface RarityLevelConfig {
  level_range: [number, number];
  color: string;
  label: string;
}

/**
 * Level ranges and configurations for each rarity
 */
export const LEVEL_SCALING: Record<Rarity, RarityLevelConfig> = {
  Common: {
    level_range: [1, 10],
    color: '#9ca3af',
    label: 'Common'
  },
  Good: {
    level_range: [11, 20],
    color: '#4ade80',
    label: 'Good'
  },
  Rare: {
    level_range: [21, 30],
    color: '#60a5fa',
    label: 'Rare'
  },
  Epic: {
    level_range: [31, 40],
    color: '#a78bfa',
    label: 'Epic'
  },
  'Epic+': {
    level_range: [41, 50],
    color: '#7c3aed',
    label: 'Epic+'
  },
  Legendary: {
    level_range: [51, 60],
    color: '#fbbf24',
    label: 'Legendary'
  }
};

/**
 * Get maximum level for a rarity tier
 */
export function getMaxLevel(rarity: Rarity): number {
  return LEVEL_SCALING[rarity].level_range[1];
}

/**
 * Get minimum level for a rarity tier
 */
export function getMinLevel(rarity: Rarity): number {
  return LEVEL_SCALING[rarity].level_range[0];
}

/**
 * Check if level is valid for a rarity tier
 */
export function isValidLevel(level: number, rarity: Rarity): boolean {
  const [min, max] = LEVEL_SCALING[rarity].level_range;
  return level >= min && level <= max;
}

/**
 * Get rarity tier for a given level
 */
export function getRarityForLevel(level: number): Rarity | null {
  for (const [rarity, config] of Object.entries(LEVEL_SCALING)) {
    const [min, max] = config.level_range;
    if (level >= min && level <= max) {
      return rarity as Rarity;
    }
  }
  return null;
}
