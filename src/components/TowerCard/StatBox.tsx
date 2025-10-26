import { memo } from 'react';
import './StatBox.css';

interface StatBoxProps {
  emoji: string;
  label: string;
  value: string;
  type: 'damage' | 'attackrate' | 'range' | 'crit' | 'targets' | 'unlock';
  layout?: 'horizontal' | 'vertical';
}

export const StatBox = memo(({ emoji, label, value, type, layout = 'vertical' }: StatBoxProps) => {
  return (
    <div className={`stat-box stat-box-${layout}`} data-stat={type}>
      <span className="stat-emoji">{emoji}</span>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
});

StatBox.displayName = 'StatBox';
