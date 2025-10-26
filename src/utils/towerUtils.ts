import type { Tower, UnlockInfo } from '../types/tower';
import type { Rarity } from '../types/tower';
import { RARITY_MULTIPLIERS } from './rarityUtils';

export const formatUnlockText = (unlockValue: UnlockInfo | string | null | undefined): string => {
  if (unlockValue === null || unlockValue === undefined || unlockValue === '') {
    return 'Event: Special';
  }

  if (typeof unlockValue === 'object' && unlockValue.event) {
    const eventText = unlockValue.event;
    if (eventText.toLowerCase().startsWith('chapter ')) {
      const chapterNum = eventText.substring(8).trim();
      return `Chapter ${chapterNum}`;
    }
    return `Event: ${eventText}`;
  }

  if (typeof unlockValue === 'string') {
    if (unlockValue.trim() === '') {
      return 'Event: Special';
    }

    if (unlockValue.toLowerCase().startsWith('chapter ')) {
      const match = unlockValue.match(/chapter\s+(\d+)/i);
      if (match) {
        return `Chapter ${match[1]}`;
      }
    }

    if (unlockValue.toLowerCase().includes('event') || unlockValue.toLowerCase().includes('special')) {
      const eventMatch = unlockValue.match(/\(([^)]+)\)/);
      if (eventMatch) {
        return `Event: ${eventMatch[1]}`;
      }
      return `Event: ${unlockValue}`;
    }

    return unlockValue;
  }

  return 'Unknown';
};

export const getUnlockInfo = (unlockValue: UnlockInfo | string | null | undefined): { label: string; value: string } => {
  if (unlockValue === null || unlockValue === undefined || unlockValue === '') {
    return { label: 'Event', value: 'Special' };
  }

  if (typeof unlockValue === 'object' && unlockValue.event) {
    const eventText = unlockValue.event;
    if (eventText.toLowerCase().startsWith('chapter ')) {
      const chapterNum = eventText.substring(8).trim();
      return { label: 'Chapter', value: chapterNum };
    }
    return { label: 'Event', value: eventText };
  }

  if (typeof unlockValue === 'string') {
    if (unlockValue.trim() === '') {
      return { label: 'Event', value: 'Special' };
    }

    if (unlockValue.toLowerCase().startsWith('chapter ')) {
      const match = unlockValue.match(/chapter\s+(\d+)/i);
      if (match) {
        return { label: 'Chapter', value: match[1] };
      }
    }

    if (unlockValue.toLowerCase().includes('event') || unlockValue.toLowerCase().includes('special')) {
      const eventMatch = unlockValue.match(/\(([^)]+)\)/);
      if (eventMatch) {
        return { label: 'Event', value: eventMatch[1] };
      }
      return { label: 'Event', value: unlockValue };
    }

    return { label: 'Event', value: unlockValue };
  }

  return { label: 'Event', value: 'Unknown' };
};

export const calculatePower = (tower: Tower, rarity: Rarity, level: number): number => {
  const baseDamage = parseFloat(tower.damage.match(/[\d.]+/)?.[0] || '0');
  const attackSpeed = parseFloat(tower.attack_speed.match(/[\d.]+/)?.[0] || '1');
  const range = parseFloat(tower.range.match(/[\d.]+/)?.[0] || '1');
  const critChance = parseFloat(tower.crit_chance?.match(/[\d.]+/)?.[0] || '0');

  const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
  const levelMultiplier = 1 + (level - 1) * 0.1;

  const dps = baseDamage / attackSpeed;
  const power = dps * range * (1 + critChance / 100) * rarityMultiplier * levelMultiplier;

  return Math.round(power * 10) / 10;
};

export const getTargetInfo = (targets: string): { emoji: string; text: string } => {
  const lower = targets.toLowerCase();
  if (lower.includes('ground') && lower.includes('air')) {
    return { emoji: '🌐', text: targets };
  }
  if (lower.includes('ground')) {
    return { emoji: '⛰️', text: targets };
  }
  if (lower.includes('air')) {
    return { emoji: '☁️', text: targets };
  }
  return { emoji: '🎯', text: targets };
};
