import { memo } from 'react';
import { RARITY_LIST } from '../../utils/rarityUtils';
import type { Rarity } from '../../types/tower';
import './RaritySelector.css';

interface RaritySelectorProps {
  selectedRarity: Rarity;
  onRarityChange: (rarity: Rarity) => void;
}

const RaritySelectorComponent = ({ selectedRarity, onRarityChange }: RaritySelectorProps) => {
  return (
    <div id="global-rarity-selector">
      <label>Rareza Global:</label>
      <div className="rarity-buttons">
        {RARITY_LIST.map((rarity) => (
          <button
            key={rarity}
            className={`global-rarity-btn ${selectedRarity === rarity ? 'active' : ''}`}
            data-rarity={rarity}
            onClick={() => onRarityChange(rarity)}
            aria-pressed={selectedRarity === rarity}
          >
            {rarity}
          </button>
        ))}
      </div>
    </div>
  );
};

export const RaritySelector = memo(RaritySelectorComponent);

RaritySelector.displayName = 'RaritySelector';
