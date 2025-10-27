export type TowerType = 'Vanguard' | 'Swift' | 'Elemental' | 'Utility';

export type Rarity = 'Common' | 'Good' | 'Rare' | 'Epic' | 'Epic+' | 'Legendary';

export type ViewMode = 'detailed' | 'simple' | 'minimal';

export interface Upgrade {
  level: string;
  description: string;
}

export interface UnlockInfo {
  chapter?: number;
  event?: string;
}

export interface DamageInfo {
  value?: number;
  normal?: number;
  third_shot?: number;
  burst_damage?: number;
  initial?: number;
  medium?: number;
  high?: number;
  type?: string;
  note?: string;
}

export interface RangeInfo {
  min?: number;
  max?: number;
  grid?: number;
  blast?: number;
}

export interface AdditionalStats {
  unit_health?: number;
  deploy_range?: string;
  slow_effect?: number;
  stun_duration?: number;
  push_strength?: number;
  ignite_damage?: number;
  cooldown?: number;
  burst_trigger?: number;
  blast_damage?: number;
  blast_radius?: number;
  hook_length?: number;
  hook_count?: number;
  rage_timer?: number;
  rage_boost?: number;
  note?: string;
}

export interface Tower {
  id: number;
  name: string;
  unlock_at: UnlockInfo;
  targets: string[];
  type: TowerType;
  range: number | RangeInfo | null;
  attack_speed: number | null;
  damage: DamageInfo | number | null;
  crit_chance?: number | null;
  additional_stats?: AdditionalStats;
  upgrades?: Upgrade[];
  commentary?: string;
  image: string;
}

export interface TowersData {
  towers: Tower[];
}

