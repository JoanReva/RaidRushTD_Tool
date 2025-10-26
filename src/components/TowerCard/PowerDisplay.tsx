import './PowerDisplay.css';

interface PowerDisplayProps {
  power: number;
}

export const PowerDisplay = ({ power }: PowerDisplayProps) => {
  return (
    <div className="power-display">
      <span className="power-icon">🔥</span>
      <span className="power-value">{power}</span>
    </div>
  );
};
