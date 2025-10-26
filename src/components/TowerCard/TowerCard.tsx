import { useState } from 'react';
import type { Tower, Rarity, ViewMode } from '../../types/tower';
import { calculatePower, getTargetInfo, getUnlockInfo } from '../../utils/towerUtils';
import { StatBox } from './StatBox';
import { PowerDisplay } from './PowerDisplay';
import { LevelDisplay } from './LevelDisplay';
import './TowerCard.css';

interface TowerCardProps {
  tower: Tower;
  viewMode: ViewMode;
  globalRarity: Rarity;
}

export const TowerCard = ({ tower, viewMode, globalRarity }: TowerCardProps) => {
  const [level, setLevel] = useState(1);
  const [commentaryOpen, setCommentaryOpen] = useState(false);

  const power = calculatePower(tower, globalRarity, level);
  const unlockInfo = getUnlockInfo(tower.unlock_at);

  const incrementLevel = () => {
    if (level < 100) setLevel(level + 1);
  };

  const decrementLevel = () => {
    if (level > 1) setLevel(level - 1);
  };

  const getTypeIcon = (type: string): string => {
    const icons: Record<string, string> = {
      Vanguard: '/vanguard.png',
      Swift: '/swift.png',
      Elemental: '/elemental.png',
      Utility: '/utility.png',
    };
    return icons[type] || '/vanguard.png';
  };

  return (
    <div className={`tower-card view-${viewMode}`}>
      <div className="tower-header">
        <div className="tower-top-section">
          <div className="tower-info-wrapper">
            <div className={`rarity-banner rarity-${globalRarity.toLowerCase().replace('+', '-plus')}`}>
              {globalRarity}
            </div>
            <div className="tower-name">{tower.name}</div>
          </div>
          <div className="tower-image-section">
            <img
              src={tower.image}
              alt={tower.name}
              className="tower-main-image"
            />
            <div className="type-icon-overlay-wrapper">
              <img
                src={getTypeIcon(tower.type)}
                alt={tower.type}
                className="type-icon-overlay"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tower-body">
        <StatBox
          emoji={getTargetInfo(tower.targets).emoji}
          label="Targets"
          value={getTargetInfo(tower.targets).text}
          type="targets"
          layout="horizontal"
        />

        <div className="tower-stats-grid">
          <StatBox
            emoji="💥"
            label="Daño"
            value={tower.damage}
            type="damage"
          />
          <StatBox
            emoji="⚡"
            label="Velocidad"
            value={tower.attack_speed}
            type="attackrate"
          />
          <StatBox
            emoji="📡"
            label="Rango"
            value={tower.range}
            type="range"
          />
          {tower.crit_chance && (
            <StatBox
              emoji="🎯"
              label="Crítico"
              value={tower.crit_chance}
              type="crit"
            />
          )}
        </div>

        <StatBox
          emoji="🔓"
          label={unlockInfo.label}
          value={unlockInfo.value}
          type="unlock"
          layout="horizontal"
        />

        {tower.upgrades && tower.upgrades.length > 0 && (
          <div className="tower-upgrades">
            <div className="upgrades-title">🔧 Mejoras</div>
            <div className="upgrades-list">
              {tower.upgrades.map((upgrade, index) => (
                <div key={index} className="upgrade-item">
                  {typeof upgrade === 'object' && upgrade.level && upgrade.description ? (
                    <>
                      <strong>{upgrade.level}:</strong> {upgrade.description}
                    </>
                  ) : (
                    <>• {String(upgrade)}</>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tower.commentary && (
          <div className="tower-commentary">
            <button
              className="commentary-toggle"
              onClick={() => setCommentaryOpen(!commentaryOpen)}
            >
              💬 {commentaryOpen ? 'Ocultar' : 'Ver'} Comentario
            </button>
            {commentaryOpen && (
              <div className="commentary-content">{tower.commentary}</div>
            )}
          </div>
        )}
      </div>

      <div className="tower-bottom">
        <div className="power-level-row">
          <PowerDisplay power={power} />
          <LevelDisplay 
            level={level} 
            onIncrement={incrementLevel} 
            onDecrement={decrementLevel} 
          />
        </div>
      </div>
    </div>
  );
};
