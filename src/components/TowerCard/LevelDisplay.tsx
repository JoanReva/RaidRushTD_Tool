import { memo } from 'react';
import { TOWER_STAT_EMOJIS } from '../../constants';
import './LevelDisplay.css';

interface LevelDisplayProps {
  level: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const LevelDisplay = memo(({ level, onIncrement, onDecrement }: LevelDisplayProps) => {
  return (
    <div className="level-display">
      <span className="level-icon">{TOWER_STAT_EMOJIS.LEVEL}</span>
      <span className="level-value">{level}</span>
      <div className="level-controls">
        <button 
          className="level-btn level-btn-down" 
          onClick={onDecrement}
          aria-label="Decrease level"
        >
          ▼
        </button>
        <button 
          className="level-btn level-btn-up" 
          onClick={onIncrement}
          aria-label="Increase level"
        >
          ▲
        </button>
      </div>
    </div>
  );
});

LevelDisplay.displayName = 'LevelDisplay';
