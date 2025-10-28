import { memo } from 'react';
import type { Tower, Rarity } from '../../types';
import { getMergeUpgrade, highlightNumericValues } from '../../utils';
import { getMergeRequirement, TOWER_STAT_EMOJIS } from '../../constants';
import './MergeDisplay.css';

interface MergeDisplayProps {
  tower: Tower;
  currentRarity: string;
}

const MergeDisplayComponent = ({ tower, currentRarity }: MergeDisplayProps) => {
  const mergeUpgrade = getMergeUpgrade(tower, currentRarity as Rarity);

  // Don't show if no upgrade, no description, or already max rarity
  if (!mergeUpgrade?.description || currentRarity === 'Legendary') {
    return null;
  }

  const targetRarity = mergeUpgrade.rarity_to || 'Unknown';
  const cardsRequired = getMergeRequirement(targetRarity);
  const rarityClass = targetRarity.toLowerCase().replace('+', '-plus');

  return (
    <div className="merge-display">
      <div className="merge-header">
        <span className="merge-label">
          {TOWER_STAT_EMOJIS.MERGE} Merge {cardsRequired}× {tower.name}
        </span>
        <div className={`merge-rarity merge-rarity-${rarityClass}`}>
          {targetRarity}
        </div>
      </div>
      
      <div className="merge-bonuses">
        {highlightNumericValues(mergeUpgrade.description, 'merge-value')}
      </div>
    </div>
  );
};

export const MergeDisplay = memo(MergeDisplayComponent);

MergeDisplay.displayName = 'MergeDisplay';




