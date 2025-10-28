import type { Tower, Rarity, TowerType } from '../types/tower';

/**
 * Weight factors for different stat types in power calculation
 * These multipliers represent the relative importance of each stat
 */
const STAT_WEIGHTS = {
  damage: {
    single: 1.0,      // Standard single target
    area: 1.5,        // AoE is more valuable
    area_linear: 1.3, // Linear AoE (Boomerang, Bowling)
    dot: 1.2,         // Damage over time
    ramping: 0.8,     // Laser (starts weak)
    burst: 1.4,       // Double Cannon
  },
  attack_speed: 1.0,  // Lower is better (time between attacks)
  range: 15,          // Range multiplier
  crit_chance: 200,   // Crit is very valuable
  
  // Additional stats
  unit_health: 0.5,   // For Garrison/Drone
  slow_effect: 150,   // Utility value
  stun_duration: 180, // Very valuable
  push_strength: 120, // Utility
  ignite_damage: 1.3, // DoT damage
  
  // Support tower bonuses
  bonus_damage: 250,
  bonus_health: 200,
  bonus_crit_chance: 300,
  bonus_push_strength: 180,
};

/**
 * Type multipliers for tower roles
 */
const TYPE_MULTIPLIERS: Record<TowerType, number> = {
  'Vanguard': 1.1,   // High damage dealers
  'Swift': 1.0,      // Balanced
  'Elemental': 1.05, // Special effects
  'Utility': 0.85,   // Support role (less direct power)
};

/**
 * Rarity multipliers (base stats are stronger at higher rarities)
 */
const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  'Common': 1.0,
  'Good': 1.15,
  'Rare': 1.35,
  'Epic': 1.60,
  'Epic+': 1.90,
  'Legendary': 2.30,
};

/**
 * Extract numeric damage value from tower damage configuration
 */
function extractDamageValue(tower: Tower): number {
  if (!tower.damage) return 0;
  
  if (typeof tower.damage === 'number') {
    return tower.damage;
  }
  
  if (typeof tower.damage === 'object') {
    // Standard damage
    if ('value' in tower.damage) {
      return tower.damage.value || 0;
    }
    
    // Ramping damage (Laser Tower) - use average
    if ('initial' in tower.damage && 'medium' in tower.damage && 'high' in tower.damage) {
      const initial = tower.damage.initial ?? 0;
      const medium = tower.damage.medium ?? 0;
      const high = tower.damage.high ?? 0;
      return (initial + medium + high) / 3;
    }
    
    // Burst damage (Double Cannon) - weighted average
    if ('normal' in tower.damage && 'third_shot' in tower.damage) {
      const normal = tower.damage.normal ?? 0;
      const thirdShot = tower.damage.third_shot ?? 0;
      return (normal * 2 + thirdShot) / 3;
    }
  }
  
  return 0;
}

/**
 * Get damage type multiplier
 */
function getDamageTypeMultiplier(tower: Tower): number {
  if (!tower.damage || typeof tower.damage !== 'object') {
    return STAT_WEIGHTS.damage.single;
  }
  
  // Check damage type property
  if ('type' in tower.damage && tower.damage.type) {
    const weights = STAT_WEIGHTS.damage;
    const typeMap: Record<string, number> = {
      'area': weights.area,
      'area_linear': weights.area_linear,
      'dot': weights.dot,
    };
    
    return typeMap[tower.damage.type] || weights.single;
  }
  
  // Infer type from damage structure
  if ('initial' in tower.damage) return STAT_WEIGHTS.damage.ramping;
  if ('third_shot' in tower.damage) return STAT_WEIGHTS.damage.burst;
  
  return STAT_WEIGHTS.damage.single;
}

/**
 * Calculate power contribution from additional stats
 */
function calculateAdditionalStatsPower(tower: Tower): number {
  if (!tower.additional_stats) return 0;
  
  const stats = tower.additional_stats;
  let power = 0;
  
  // Simple stat multiplications
  const simpleStats = [
    { value: stats.unit_health, weight: STAT_WEIGHTS.unit_health },
    { value: stats.slow_effect, weight: STAT_WEIGHTS.slow_effect },
    { value: stats.stun_duration, weight: STAT_WEIGHTS.stun_duration },
    { value: stats.push_strength, weight: STAT_WEIGHTS.push_strength },
  ] as const;
  
  simpleStats.forEach(({ value, weight }) => {
    if (value) power += value * weight;
  });
  
  // Support bonuses (with 'in' check)
  const supportBonuses = [
    { key: 'bonus_damage', weight: STAT_WEIGHTS.bonus_damage },
    { key: 'bonus_health', weight: STAT_WEIGHTS.bonus_health },
    { key: 'bonus_crit_chance', weight: STAT_WEIGHTS.bonus_crit_chance },
    { key: 'bonus_push_strength', weight: STAT_WEIGHTS.bonus_push_strength },
  ] as const;
  
  supportBonuses.forEach(({ key, weight }) => {
    if (key in stats && stats[key]) {
      power += (stats[key] as number) * weight;
    }
  });
  
  // Ignite damage (DoT)
  if ('ignite_damage' in stats && 'ignite_duration' in stats && 
      stats.ignite_damage && stats.ignite_duration) {
    const igniteDPS = stats.ignite_damage / stats.ignite_duration;
    power += igniteDPS * STAT_WEIGHTS.ignite_damage * stats.ignite_duration;
  }
  
  // Blast damage
  if (stats.blast_damage && stats.blast_radius) {
    power += stats.blast_damage * stats.blast_radius * 1.5;
  }
  
  // Cooldown penalty (longer cooldown = less power)
  if (stats.cooldown && stats.cooldown > 1) {
    power /= Math.sqrt(stats.cooldown);
  }
  
  return power;
}

/**
 * Calculate comprehensive power rating for a tower
 * Takes into account rarity, stats, type, and special mechanics
 * Level scaling is implicit through improved stats
 */
export function calculatePower(
  tower: Tower,
  rarity: Rarity
): number {
  let power = 0;
  
  // 1. BASE DAMAGE with type multiplier
  const baseDamage = extractDamageValue(tower);
  const damageTypeMultiplier = getDamageTypeMultiplier(tower);
  power = baseDamage * damageTypeMultiplier;
  
  // 2. ATTACK SPEED (DPS multiplier)
  // Lower attack_speed = faster attacks = higher DPS
  if (tower.attack_speed && tower.attack_speed > 0) {
    // Invert: 1 second attack = 1x, 0.5 seconds = 2x, 2 seconds = 0.5x
    const dpsMultiplier = STAT_WEIGHTS.attack_speed / tower.attack_speed;
    power *= dpsMultiplier;
  }
  
  // 3. RANGE VALUE
  let range = 0;
  if (typeof tower.range === 'number') {
    range = tower.range;
  } else if (typeof tower.range === 'object' && tower.range !== null) {
    range = tower.range.max || 0;
  } else if (tower.range === 'infinite') {
    range = 10; // High value for infinite range
  }
  
  if (range > 0 && range !== Infinity) {
    power += range * STAT_WEIGHTS.range;
  }
  
  // 4. CRIT CHANCE
  if (tower.crit_chance && tower.crit_chance > 0) {
    // Crit adds multiplicative damage (assuming 2x damage on crit)
    const critMultiplier = 1 + (tower.crit_chance * 1.0);
    power *= critMultiplier;
    power += tower.crit_chance * STAT_WEIGHTS.crit_chance;
  }
  
  // 5. ADDITIONAL STATS
  power += calculateAdditionalStatsPower(tower);
  
  // 6. TYPE MULTIPLIER
  const typeMultiplier = TYPE_MULTIPLIERS[tower.type] || 1.0;
  power *= typeMultiplier;
  
  // 7. RARITY MULTIPLIER
  const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
  power *= rarityMultiplier;
  
  // 8. TARGET VERSATILITY BONUS
  if (tower.targets.includes('Ground') && tower.targets.includes('Air')) {
    power *= 1.15; // +15% for hitting both
  }
  
  return Math.round(power * 10) / 10; // Round to 1 decimal
}

/**
 * Get power rating with descriptive label
 */
export function getPowerRating(power: number): {
  value: number;
  label: string;
  color: string;
  stars: number;
} {
  if (power < 100) return {
    value: power,
    label: 'Weak',
    color: '#ef4444',
    stars: 1
  };
  
  if (power < 300) return {
    value: power,
    label: 'Poor',
    color: '#f97316',
    stars: 2
  };
  
  if (power < 600) return {
    value: power,
    label: 'Decent',
    color: '#fb923c',
    stars: 3
  };
  
  if (power < 1000) return {
    value: power,
    label: 'Average',
    color: '#fbbf24',
    stars: 4
  };
  
  if (power < 1500) return {
    value: power,
    label: 'Good',
    color: '#a3e635',
    stars: 5
  };
  
  if (power < 2500) return {
    value: power,
    label: 'Strong',
    color: '#22c55e',
    stars: 6
  };
  
  if (power < 4000) return {
    value: power,
    label: 'Great',
    color: '#10b981',
    stars: 7
  };
  
  if (power < 6000) return {
    value: power,
    label: 'Powerful',
    color: '#06b6d4',
    stars: 8
  };
  
  if (power < 9000) return {
    value: power,
    label: 'Elite',
    color: '#3b82f6',
    stars: 9
  };
  
  return {
    value: power,
    label: 'Godlike',
    color: '#a855f7',
    stars: 10
  };
}
