import type { TowerType } from '../types/tower';

/**
 * Configuración centralizada de torres
 * Consolida iconos, emojis y configuraciones de nivel
 */
export const TOWER_CONFIG = {
  TYPE_ICONS: {
    Vanguard: '/vanguard.png',
    Swift: '/swift.png',
    Elemental: '/elemental.png',
    Utility: '/utility.png',
  } satisfies Record<TowerType, string>,
  
  EMOJIS: {
    // Stats
    DAMAGE: '💥',
    SPEED: '⚡',
    RANGE: '📡',
    CRIT: '🎯',
    UNLOCK: '🔓',
    POWER: '💪',
    LEVEL: '🎖️',
    UPGRADES: '🔧',
    MERGE: '🔀',
    COMMENTARY: '💬',
    // Targets
    TARGET_BOTH: '🌐',
    TARGET_GROUND: '⛰️',
    TARGET_AIR: '☁️',
    TARGET_DEFAULT: '🎯',
  } as const,
  
  LEVEL: {
    MIN: 1,
    MAX: 100,
    POWER_MULTIPLIER: 0.1,
  } as const,
} as const;

// Exports individuales para compatibilidad con código existente
export const TOWER_TYPE_ICONS = TOWER_CONFIG.TYPE_ICONS;
export const TOWER_STAT_EMOJIS = TOWER_CONFIG.EMOJIS;
export const TOWER_TARGET_EMOJIS = {
  BOTH: TOWER_CONFIG.EMOJIS.TARGET_BOTH,
  GROUND: TOWER_CONFIG.EMOJIS.TARGET_GROUND,
  AIR: TOWER_CONFIG.EMOJIS.TARGET_AIR,
  DEFAULT: TOWER_CONFIG.EMOJIS.TARGET_DEFAULT,
} as const;
export const MAX_TOWER_LEVEL = TOWER_CONFIG.LEVEL.MAX;
export const MIN_TOWER_LEVEL = TOWER_CONFIG.LEVEL.MIN;
export const LEVEL_POWER_MULTIPLIER = TOWER_CONFIG.LEVEL.POWER_MULTIPLIER;
