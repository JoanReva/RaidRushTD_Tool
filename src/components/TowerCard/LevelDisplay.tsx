import './LevelDisplay.css';

interface LevelDisplayProps {
  level: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const LevelDisplay = ({ level, onIncrement, onDecrement }: LevelDisplayProps) => {
  return (
    <div className="level-display">
      <span className="level-icon">🎖️</span>
      <span className="level-value">{level}</span>
      <div className="level-controls">
        <button className="level-btn level-btn-up" onClick={onIncrement}>▲</button>
        <button className="level-btn level-btn-down" onClick={onDecrement}>▼</button>
      </div>
    </div>
  );
};
