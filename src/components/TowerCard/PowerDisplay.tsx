import { memo } from 'react';
import { TOWER_STAT_EMOJIS } from '../../constants';
import './PowerDisplay.css';

interface PowerRating {
  value: number;
  label: string;
  color: string;
  stars: number;
}

interface PowerDisplayProps {
  powerData: PowerRating;
}

export const PowerDisplay = memo(({ powerData }: PowerDisplayProps) => {
  const starDisplay = '⭐'.repeat(powerData.stars);
  
  return (
    <div className="power-display">
      <span className="power-icon">{TOWER_STAT_EMOJIS.POWER}</span>
      <div className="power-content">
        <span 
          className="power-label" 
          style={{ color: powerData.color }}
        >
          {powerData.label}
        </span>
        <span className="power-stars">{starDisplay}</span>
      </div>
      <span className="power-value">{Math.round(powerData.value)}</span>
    </div>
  );
});

PowerDisplay.displayName = 'PowerDisplay';
