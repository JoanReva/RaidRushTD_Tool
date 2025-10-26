export type TowerType = 'Vanguard' | 'Swift' | 'Elemental' | 'Utility';

export type Rarity = 'Common' | 'Good' | 'Rare' | 'Epic' | 'Epic+' | 'Legendary';

export type ViewMode = 'detailed' | 'simple' | 'minimal';

export interface Upgrade {
  level: string;
  description: string;
}

export interface UnlockInfo {
  event?: string;
}

export interface Tower {
  name: string;
  unlock_at: UnlockInfo | string;
  targets: string;
  type: TowerType;
  range: string;
  attack_speed: string;
  damage: string;
  crit_chance?: string;
  upgrades?: Upgrade[];
  commentary?: string;
  image: string;
}

export interface TowersData {
  towers: Tower[];
}
