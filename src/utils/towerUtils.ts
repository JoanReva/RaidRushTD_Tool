import type { Tower, UnlockInfo } from '../types/tower';
import type { Rarity } from '../types/tower';
import { RARITY_MULTIPLIERS } from './rarityUtils';
import { LEVEL_POWER_MULTIPLIER, TOWER_TARGET_EMOJIS } from '../constants';

/**
 * Obtiene información de desbloqueo formateada de una torre
 * @param unlockValue - Información de desbloqueo (objeto UnlockInfo)
 * @returns Objeto con label y value para mostrar en UI
 */
export const getUnlockInfo = (unlockValue: UnlockInfo | null | undefined): { label: string; value: string } => {
  if (!unlockValue) {
    return { label: 'Event', value: 'Special' };
  }

  if (unlockValue.chapter) {
    return { label: 'Chapter', value: unlockValue.chapter.toString() };
  }
  
  if (unlockValue.event) {
    return { label: 'Event', value: unlockValue.event };
  }

  return { label: 'Event', value: 'Unknown' };
};

/**
 * Calcula el poder total de una torre basado en sus estadísticas, rareza y nivel
 * @param tower - Datos de la torre
 * @param rarity - Rareza de la torre
 * @param level - Nivel de la torre
 * @returns Poder calculado redondeado a 1 decimal
 */
export const calculatePower = (tower: Tower, rarity: Rarity, level: number): number => {
  // Extraer valor de daño
  let baseDamage = 0;
  const damage = tower.damage;
  
  if (typeof damage === 'number') {
    baseDamage = damage;
  } else if (damage !== null) {
    // Priorizar diferentes propiedades del objeto de daño
    baseDamage = damage.value || damage.normal || damage.initial || damage.burst_damage || 0;
  }

  // Extraer velocidad de ataque
  const attackSpeed = tower.attack_speed || 1;

  // Extraer rango
  let range = 1;
  const towerRange = tower.range;
  
  if (typeof towerRange === 'number') {
    range = towerRange;
  } else if (towerRange !== null) {
    // Si es un objeto, usar el máximo o grid
    range = towerRange.max || towerRange.grid || towerRange.blast || 1;
  }

  // Extraer probabilidad crítica (decimal: 0.20 = 20%)
  const critChance = (tower.crit_chance || 0) * 100;

  const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
  const levelMultiplier = 1 + (level - 1) * LEVEL_POWER_MULTIPLIER;

  const dps = baseDamage / attackSpeed;
  const power = dps * range * (1 + critChance / 100) * rarityMultiplier * levelMultiplier;

  return Math.round(power * 10) / 10;
};

/**
 * Obtiene el emoji y texto correspondiente al tipo de objetivo
 * @param targets - Array de strings con los objetivos
 * @returns Objeto con emoji y texto formateado
 */
export const getTargetInfo = (targets: string[]): { emoji: string; text: string } => {
  const targetsStr = targets.join(', ');
  const lower = targetsStr.toLowerCase();
  
  if (lower.includes('ground') && lower.includes('air')) {
    return { emoji: TOWER_TARGET_EMOJIS.BOTH, text: targetsStr };
  }
  if (lower.includes('ground')) {
    return { emoji: TOWER_TARGET_EMOJIS.GROUND, text: targetsStr };
  }
  if (lower.includes('air')) {
    return { emoji: TOWER_TARGET_EMOJIS.AIR, text: targetsStr };
  }
  return { emoji: TOWER_TARGET_EMOJIS.DEFAULT, text: targetsStr };
};

/**
 * Formatea el valor de daño para mostrar en UI
 * @param damage - Valor de daño (número o objeto DamageInfo)
 * @returns String formateado para mostrar
 */
export const formatDamage = (damage: Tower['damage']): string => {
  if (!damage) {
    return 'N/A';
  }
  
  if (typeof damage === 'number') {
    return damage.toString();
  }
  
  // Si tiene múltiples tipos de daño
  if (damage.normal !== undefined && damage.third_shot !== undefined) {
    return `${damage.normal} / ${damage.third_shot}`;
  }
  if (damage.initial !== undefined && damage.medium !== undefined && damage.high !== undefined) {
    return `${damage.initial} → ${damage.medium} → ${damage.high}`;
  }
  if (damage.burst_damage !== undefined) {
    return damage.burst_damage.toString();
  }
  if (damage.value !== undefined) {
    return damage.type ? `${damage.value} (${damage.type})` : damage.value.toString();
  }
  
  // Si tiene nota
  if (damage.note) {
    return damage.note;
  }
  
  return 'N/A';
};

/**
 * Formatea el valor de rango para mostrar en UI
 * @param range - Valor de rango (número o objeto RangeInfo)
 * @returns String formateado para mostrar
 */
export const formatRange = (range: Tower['range']): string => {
  if (!range) {
    return 'N/A';
  }
  
  if (typeof range === 'number') {
    return range.toString();
  }
  
  if (range.min !== undefined && range.max !== undefined) {
    return `${range.min} - ${range.max}`;
  }
  if (range.grid !== undefined) {
    return `${range.grid} (Grid)`;
  }
  if (range.blast !== undefined) {
    return `${range.blast} (Blast)`;
  }
  
  return 'N/A';
};

/**
 * Formatea el valor de velocidad de ataque para mostrar en UI
 * @param attackSpeed - Valor de velocidad de ataque
 * @returns String formateado para mostrar
 */
export const formatAttackSpeed = (attackSpeed: Tower['attack_speed']): string => {
  return attackSpeed?.toString() || 'N/A';
};

/**
 * Formatea el valor de probabilidad crítica para mostrar en UI
 * @param critChance - Valor de probabilidad crítica (decimal: 0.20 = 20%)
 * @returns String formateado para mostrar (ej: "20%")
 */
export const formatCritChance = (critChance: Tower['crit_chance']): string => {
  if (!critChance) {
    return 'N/A';
  }
  
  return `${(critChance * 100).toFixed(0)}%`;
};

