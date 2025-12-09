import { useCallback, useMemo } from 'react';
import { useAppState } from './hooks/useAppState';
import { RaritySelector } from './components/RaritySelector/RaritySelector';
import { ViewModeSelector } from './components/ViewModeSelector/ViewModeSelector';
import { TowerCard } from './components/TowerCard/TowerCard';
import towersData from './data/towers.json';
import commentaryData from './data/towers_commentary.json';
import type { TowersData, TowerCommentary } from './types/tower';
import './App.css';

const data = towersData as TowersData;
const commentary = commentaryData as TowerCommentary;

// Merge commentary into towers
const towersWithCommentary = data.towers.map(tower => ({
  ...tower,
  commentary: commentary.commentary[tower.id.toString()]
}));

function App() {
  const { globalRarity, globalLevel, setGlobalRarity, setGlobalLevel, viewMode, setViewMode } = useAppState();

  const handleRarityChange = useCallback(
    (rarity: typeof globalRarity) => setGlobalRarity(rarity),
    [setGlobalRarity]
  );

  const handleLevelChange = useCallback(
    (direction: 1 | -1) => setGlobalLevel(direction),
    [setGlobalLevel]
  );

  const handleViewModeChange = useCallback(
    (mode: typeof viewMode) => setViewMode(mode),
    [setViewMode]
  );

  const towerCards = useMemo(
    () =>
      towersWithCommentary.map((tower) => (
        <TowerCard
          key={tower.id}
          tower={tower}
          viewMode={viewMode}
          globalRarity={globalRarity}
          globalLevel={globalLevel}
          onLevelChange={handleLevelChange}
        />
      )),
    [viewMode, globalRarity, globalLevel, handleLevelChange]
  );

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <div className="header-text">
            <h1 className="title">🏰 Raid Rush TD - Tower Guide</h1>
            <p className="subtitle">Tower Comparison and Analyzer</p>
          </div>
        </div>
        <div id="controls-panel">
          <ViewModeSelector selectedMode={viewMode} onModeChange={handleViewModeChange} />
          <RaritySelector selectedRarity={globalRarity} onRarityChange={handleRarityChange} />
        </div>
      </header>

      <main id="towers-container">{towerCards}</main>

      <footer>
        <p>© 2025 Raid Rush TD Tool | Unofficial Tool</p>
      </footer>
    </div>
  );
}

export default App;
