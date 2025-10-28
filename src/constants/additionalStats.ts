/**
 * Configuration for additional tower stats
 * Maps stat keys to their display properties (emoji, label, formatter)
 * 
 * Emojis used here are unique and don't overlap with existing ones in TowerCard:
 * Existing: 💥(damage), ⚡(speed), 📡(range), 🎯(crit), 🔓(unlock), 💪(power), 🎖️(level)
 *           🔧(upgrades), 🔀(merge), 💬(commentary), 🌐(both), ⛰️(ground), ☁️(air)
 */

export const ADDITIONAL_STAT_CONFIG: Record<string, {
  emoji: string;
  label: string;
  formatter: (value: number | string) => string;
}> = {
  // Unit-based stats
  unit_health: {
    emoji: '💚',
    label: 'Unit HP',
    formatter: (v) => v.toString()
  },
  deploy_range: {
    emoji: '📍',
    label: 'Deploy Range',
    formatter: (v) => v.toString()
  },
  
  // Control effects
  slow_effect: {
    emoji: '❄️',
    label: 'Slow',
    formatter: (v) => `${(Number(v) * 100).toFixed(0)}%`
  },
  stun_duration: {
    emoji: '💫',
    label: 'Stun',
    formatter: (v) => `${v}s`
  },
  push_strength: {
    emoji: '💨',
    label: 'Push',
    formatter: (v) => typeof v === 'number' && v < 1 ? `${(v * 100).toFixed(0)}%` : v.toString()
  },
  
  // Fire/Ignite effects
  ignite_damage: {
    emoji: '🔥',
    label: 'Ignite Dmg',
    formatter: (v) => v.toString()
  },
  ignite_duration: {
    emoji: '⏱️',
    label: 'Ignite Time',
    formatter: (v) => `${v}s`
  },
  
  // Explosion stats
  blast_damage: {
    emoji: '💣',
    label: 'Blast Dmg',
    formatter: (v) => v.toString()
  },
  blast_radius: {
    emoji: '🎆',
    label: 'Blast Range',
    formatter: (v) => v.toString()
  },
  
  // Cooldown
  cooldown: {
    emoji: '⏳',
    label: 'Cooldown',
    formatter: (v) => `${v}s`
  },
  
  // Support bonuses
  bonus_damage: {
    emoji: '📈',
    label: 'Bonus Dmg',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
  bonus_health: {
    emoji: '🛡️',
    label: 'Bonus HP',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
  bonus_crit_chance: {
    emoji: '🍀',
    label: 'Bonus Crit',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
  bonus_push_strength: {
    emoji: '🚀',
    label: 'Bonus Push',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
  bonus_dance_duration: {
    emoji: '🎵',
    label: 'Bonus Dance',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
  
  // Special mechanics
  fuzzy_effect: {
    emoji: '✨',
    label: 'Fuzzy',
    formatter: (v) => `${(Number(v) * 100).toFixed(0)}%`
  },
  dance_duration: {
    emoji: '💃',
    label: 'Dance Time',
    formatter: (v) => `${v}s`
  },
  burst_trigger: {
    emoji: '🎇',
    label: 'Burst After',
    formatter: (v) => `${v} hits`
  },
  hook_length: {
    emoji: '🪝',
    label: 'Hook Length',
    formatter: (v) => v.toString()
  },
  hook_count: {
    emoji: '🎣',
    label: 'Hook Count',
    formatter: (v) => v.toString()
  },
  rage_timer: {
    emoji: '😡',
    label: 'Rage Timer',
    formatter: (v) => `${v}s`
  },
  rage_boost: {
    emoji: '⚔️',
    label: 'Rage Boost',
    formatter: (v) => `+${(Number(v) * 100).toFixed(0)}%`
  },
};

/**
 * Gets the display information for an additional stat
 * @param key - The stat key from additional_stats
 * @param value - The stat value
 * @returns Display info or null if stat not configured
 */
export const getAdditionalStatDisplay = (key: string, value: number | string) => {
  const config = ADDITIONAL_STAT_CONFIG[key];
  if (!config) return null;
  
  return {
    emoji: config.emoji,
    label: config.label,
    value: config.formatter(value)
  };
};
