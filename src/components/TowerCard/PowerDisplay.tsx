import { memo } from 'react';
import { TOWER_STAT_EMOJIS } from '../../constants';
import './PowerDisplay.css';

interface PowerDisplayProps {
  power: number;
}

export const PowerDisplay = memo(({ power }: PowerDisplayProps) => {
  return (
    <div className="power-display">
      <span className="power-icon">{TOWER_STAT_EMOJIS.POWER}</span>
      <span className="power-value">{power}</span>
    </div>
  );
});

PowerDisplay.displayName = 'PowerDisplay';
