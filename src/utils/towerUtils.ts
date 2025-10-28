import type { Tower, UnlockInfo } from '../types/tower';
import type { Rarity } from '../types/tower';
import { RARITY_MULTIPLIERS } from './rarityUtils';
import { LEVEL_POWER_MULTIPLIER, TOWER_TARGET_EMOJIS } from '../constants';

/**
 * Gets formatted unlock information for a tower
 * @param unlockValue - Unlock information (UnlockInfo object)
 * @returns Object with label and value to display in UI
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
 * Calculates total power of a tower based on its stats, rarity, and level
 * @param tower - Tower data
 * @param rarity - Tower rarity
 * @param level - Tower level
 * @returns Calculated power rounded to 1 decimal place
 */
export const calculatePower = (tower: Tower, rarity: Rarity, level: number): number => {
  // Extract damage value
  let baseDamage = 0;
  const damage = tower.damage;
  
  if (typeof damage === 'number') {
    baseDamage = damage;
  } else if (damage !== null) {
    // Prioritize different damage object properties
    baseDamage = damage.value || damage.normal || damage.initial || damage.burst_damage || 0;
  }

  // Extract attack speed
  const attackSpeed = tower.attack_speed || 1;

  // Extract range
  let range = 1;
  const towerRange = tower.range;
  
  if (typeof towerRange === 'number') {
    range = towerRange;
  } else if (towerRange !== null) {
    // If it's an object, use max or grid
    range = towerRange.max || towerRange.grid || towerRange.blast || 1;
  }

  // Extract critical chance (decimal: 0.20 = 20%)
  const critChance = (tower.crit_chance || 0) * 100;

  const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
  const levelMultiplier = 1 + (level - 1) * LEVEL_POWER_MULTIPLIER;

  const dps = baseDamage / attackSpeed;
  const power = dps * range * (1 + critChance / 100) * rarityMultiplier * levelMultiplier;

  return Math.round(power * 10) / 10;
};

/**
 * Gets the emoji and text corresponding to the target type
 * @param targets - Array of strings with targets
 * @returns Object with emoji and formatted text
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
 * Formats damage value for UI display
 * @param damage - Damage value (number or DamageInfo object)
 * @returns Formatted string for display
 */
export const formatDamage = (damage: Tower['damage']): string => {
  if (!damage) {
    return 'N/A';
  }
  
  if (typeof damage === 'number') {
    return damage.toString();
  }
  
  // If it has multiple damage types
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
  
  // If it has a note
  if (damage.note) {
    return damage.note;
  }
  
  return 'N/A';
};

/**
 * Formats range value for UI display
 * @param range - Range value (number or RangeInfo object)
 * @returns Formatted string for display
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
 * Formats attack speed value for UI display
 * @param attackSpeed - Attack speed value
 * @returns Formatted string for display
 */
export const formatAttackSpeed = (attackSpeed: Tower['attack_speed']): string => {
  return attackSpeed?.toString() || 'N/A';
};

/**
 * Formats critical chance value for UI display
 * @param critChance - Critical chance value (decimal: 0.20 = 20%)
 * @returns Formatted string for display (e.g., "20%")
 */
export const formatCritChance = (critChance: Tower['crit_chance']): string => {
  if (!critChance) {
    return 'N/A';
  }
  
  return `${(critChance * 100).toFixed(0)}%`;
};

/**
 * Gets the merge upgrade for the current rarity level
 * @param tower - Tower data
 * @param currentRarity - Current rarity level
 * @returns The merge upgrade object or undefined if not available
 */
export const getMergeUpgrade = (tower: Tower, currentRarity: Rarity) => {
  if (!tower.upgrades) {
    return undefined;
  }

  // Find the merge upgrade that matches the current rarity transition
  const mergeUpgrade = tower.upgrades.find(
    upgrade => 
      upgrade.level === 'merge' && 
      upgrade.rarity_from?.toLowerCase() === currentRarity.toLowerCase()
  );

  return mergeUpgrade;
};
