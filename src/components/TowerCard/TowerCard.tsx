import { useState, useMemo, memo } from 'react';
import type { Tower, Rarity, ViewMode } from '../../types/tower';
import { 
  calculatePower, 
  getTargetInfo, 
  getUnlockInfo,
  formatDamage,
  formatRange,
  formatAttackSpeed,
  formatCritChance
} from '../../utils/towerUtils';
import { useTowerLevel } from '../../hooks';
import { TOWER_TYPE_ICONS, TOWER_STAT_EMOJIS } from '../../constants';
import { StatBox } from './StatBox';
import { PowerDisplay } from './PowerDisplay';
import { LevelDisplay } from './LevelDisplay';
import './TowerCard.css';

interface TowerCardProps {
  tower: Tower;
  viewMode: ViewMode;
  globalRarity: Rarity;
}

const TowerCardComponent = ({ tower, viewMode, globalRarity }: TowerCardProps) => {
  const [commentaryOpen, setCommentaryOpen] = useState(false);
  const { level, incrementLevel, decrementLevel } = useTowerLevel();

  const power = useMemo(
    () => calculatePower(tower, globalRarity, level),
    [tower, globalRarity, level]
  );

  const unlockInfo = useMemo(
    () => getUnlockInfo(tower.unlock_at),
    [tower.unlock_at]
  );

  const targetInfo = useMemo(
    () => getTargetInfo(tower.targets),
    [tower.targets]
  );

  const typeIcon = useMemo(
    () => TOWER_TYPE_ICONS[tower.type] || TOWER_TYPE_ICONS.Vanguard,
    [tower.type]
  );

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
              loading="lazy"
            />
            <div className="type-icon-overlay-wrapper">
              <img
                src={typeIcon}
                alt={tower.type}
                className="type-icon-overlay"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tower-body">
        <StatBox
          emoji={targetInfo.emoji}
          label="Targets"
          value={targetInfo.text}
          type="targets"
          layout="horizontal"
        />

        <div className="tower-stats-grid">
          <StatBox
            emoji={TOWER_STAT_EMOJIS.DAMAGE}
            label="Damage"
            value={formatDamage(tower.damage)}
            type="damage"
          />
          <StatBox
            emoji={TOWER_STAT_EMOJIS.SPEED}
            label="Attack Rate"
            value={formatAttackSpeed(tower.attack_speed)}
            type="attackrate"
          />
          <StatBox
            emoji={TOWER_STAT_EMOJIS.RANGE}
            label="Attack Range"
            value={formatRange(tower.range)}
            type="range"
          />
          {tower.crit_chance && (
            <StatBox
              emoji={TOWER_STAT_EMOJIS.CRIT}
              label="Crit Chance"
              value={formatCritChance(tower.crit_chance)}
              type="crit"
            />
          )}
        </div>

        <StatBox
          emoji={TOWER_STAT_EMOJIS.UNLOCK}
          label={unlockInfo.label}
          value={unlockInfo.value}
          type="unlock"
          layout="horizontal"
        />

        {tower.upgrades && tower.upgrades.length > 0 && (
          <div className="tower-upgrades">
            <div className="upgrades-title">{TOWER_STAT_EMOJIS.UPGRADES} Upgrades</div>
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
              aria-expanded={commentaryOpen}
            >
              {TOWER_STAT_EMOJIS.COMMENTARY} {commentaryOpen ? 'Hide' : 'Show'} Commentary
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

export const TowerCard = memo(TowerCardComponent);

TowerCard.displayName = 'TowerCard';
