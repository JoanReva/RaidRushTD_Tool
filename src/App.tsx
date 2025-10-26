import { useAppState } from './hooks/useAppState';
import { RaritySelector } from './components/RaritySelector/RaritySelector';
import { ViewModeSelector } from './components/ViewModeSelector/ViewModeSelector';
import { TowerCard } from './components/TowerCard/TowerCard';
import towersData from './data/towers.json';
import type { TowersData } from './types/tower';
import './App.css';

const data = towersData as TowersData;

function App() {
  const { globalRarity, setGlobalRarity, viewMode, setViewMode } = useAppState();

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <div className="header-text">
            <h1 className="title">🏰 Raid Rush TD - Tower Guide</h1>
            <p className="subtitle">Comparador y analizador de torres</p>
          </div>
        </div>
        <div id="controls-panel">
          <ViewModeSelector selectedMode={viewMode} onModeChange={setViewMode} />
          <RaritySelector selectedRarity={globalRarity} onRarityChange={setGlobalRarity} />
        </div>
      </header>

      <main id="towers-container">
        {data.towers.map((tower, index) => (
          <TowerCard
            key={`${tower.name}-${index}`}
            tower={tower}
            viewMode={viewMode}
            globalRarity={globalRarity}
          />
        ))}
      </main>

      <footer>
        <p>© 2025 Raid Rush TD Tool | Herramienta no oficial</p>
      </footer>
    </div>
  );
}

export default App;
