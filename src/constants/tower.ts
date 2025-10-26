import type { TowerType } from '../types/tower';

export const TOWER_TYPE_ICONS: Record<TowerType, string> = {
  Vanguard: '/vanguard.png',
  Swift: '/swift.png',
  Elemental: '/elemental.png',
  Utility: '/utility.png',
} as const;

export const TOWER_STAT_EMOJIS = {
  DAMAGE: '💥',
  SPEED: '⚡',
  RANGE: '📡',
  CRIT: '🎯',
  UNLOCK: '🔓',
  POWER: '💪',
  LEVEL: '🎖️',
  UPGRADES: '🔧',
  COMMENTARY: '💬',
} as const;

export const TOWER_TARGET_EMOJIS = {
  BOTH: '🌐',
  GROUND: '⛰️',
  AIR: '☁️',
  DEFAULT: '🎯',
} as const;

export const MAX_TOWER_LEVEL = 100;
export const MIN_TOWER_LEVEL = 1;
export const LEVEL_POWER_MULTIPLIER = 0.1;
