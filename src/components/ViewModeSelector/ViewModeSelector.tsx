import { memo } from 'react';
import type { ViewMode } from '../../types/tower';
import './ViewModeSelector.css';

interface ViewModeSelectorProps {
  selectedMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: 'detailed', label: 'Detallado' },
  { value: 'simple', label: 'Simple' },
  { value: 'minimal', label: 'Minimal' },
];

const ViewModeSelectorComponent = ({ selectedMode, onModeChange }: ViewModeSelectorProps) => {
  return (
    <div id="view-mode-selector">
      <label>Modo de Vista:</label>
      <div className="view-mode-buttons">
        {VIEW_MODES.map(({ value, label }) => (
          <button
            key={value}
            className={`view-mode-btn ${selectedMode === value ? 'active' : ''}`}
            data-mode={value}
            onClick={() => onModeChange(value)}
            aria-pressed={selectedMode === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ViewModeSelector = memo(ViewModeSelectorComponent);

ViewModeSelector.displayName = 'ViewModeSelector';
