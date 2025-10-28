/**
 * Merge system configuration
 * Defines how many cards are required to merge into each rarity tier
 */

export const MERGE_REQUIREMENTS: Record<string, number> = {
  Good: 3,
  Rare: 3,
  Epic: 3,
  'Epic+': 2,
  Legendary: 2,
};

/**
 * Get the number of cards required to merge into a specific rarity
 */
export function getMergeRequirement(targetRarity: string): number {
  return MERGE_REQUIREMENTS[targetRarity] ?? 3;
}
