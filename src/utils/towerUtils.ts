import type { Tower, UnlockInfo, Rarity } from '../types/tower';
import { TOWER_TARGET_EMOJIS } from '../constants';

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
  if (!damage) return 'N/A';
  if (typeof damage === 'number') return damage.toString();
  
  // Check different damage patterns using array of formatters
  const formatters = [
    { condition: () => damage.normal !== undefined && damage.third_shot !== undefined, 
      format: () => `${damage.normal} / ${damage.third_shot}` },
    { condition: () => damage.initial !== undefined && damage.medium !== undefined && damage.high !== undefined, 
      format: () => `${damage.initial} → ${damage.medium} → ${damage.high}` },
    { condition: () => damage.burst_damage !== undefined, 
      format: () => damage.burst_damage!.toString() },
    { condition: () => damage.value !== undefined, 
      format: () => damage.type ? `${damage.value} (${damage.type})` : damage.value!.toString() },
    { condition: () => !!damage.note, 
      format: () => damage.note! }
  ];

  const formatter = formatters.find(f => f.condition());
  return formatter ? formatter.format() : 'N/A';
};

/**
 * Formats range value for UI display
 * @param range - Range value (number or RangeInfo object)
 * @returns Formatted string for display
 */
export const formatRange = (range: Tower['range']): string => {
  if (!range) return 'N/A';
  if (typeof range === 'number') return range.toString();
  
  // Check different range patterns
  if (range.min !== undefined && range.max !== undefined) return `${range.min} - ${range.max}`;
  if (range.grid !== undefined) return `${range.grid} (Grid)`;
  if (range.blast !== undefined) return `${range.blast} (Blast)`;
  
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
  return critChance ? `${(critChance * 100).toFixed(0)}%` : 'N/A';
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
