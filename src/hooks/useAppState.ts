import { useState, useCallback } from 'react';
import type { Rarity, ViewMode } from '../types/tower';
import { getMinLevel, getRarityForLevel } from '../constants/levelScaling';

/**
 * Internal level system for boundary handling:
 * - Regular levels: 1, 2, ..., 59, 60
 * - Boundary levels (10, 20, 30, 40, 50) have TWO states:
 *   - X.0 = Lower rarity (e.g., 50.0 = Epic+)
 *   - X.5 = Higher rarity (e.g., 50.5 = Legendary)
 * - Display level: Math.floor(internalLevel)
 */

const LEVEL_MIN = 1;
const LEVEL_MAX = 60;
const BOUNDARY_OFFSET = 0.5;

const isBoundaryLevel = (level: number): boolean => 
  level % 10 === 0 && level < LEVEL_MAX;

const getRarityAtBoundary = (internalLevel: number, displayLevel: number): Rarity => {
  const isLowerRarity = internalLevel === displayLevel;
  const adjacentLevel = isLowerRarity ? displayLevel - 1 : displayLevel + 1;
  return getRarityForLevel(adjacentLevel) || 'Common';
};

export const useAppState = () => {
  const [globalRarity, setGlobalRarityState] = useState<Rarity>('Common');
  const [internalLevel, setInternalLevel] = useState<number>(LEVEL_MIN);
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  const handleSetGlobalRarity = useCallback((rarity: Rarity) => {
    const targetLevel = rarity === 'Common' ? LEVEL_MIN : getMinLevel(rarity) + 9;
    const internal = isBoundaryLevel(targetLevel) ? targetLevel + BOUNDARY_OFFSET : targetLevel;
    
    setGlobalRarityState(rarity);
    setInternalLevel(internal);
  }, []);

  const handleSetGlobalLevel = useCallback((direction: 1 | -1) => {
    setInternalLevel(prevInternal => {
      const displayLevel = Math.floor(prevInternal);
      const isAtBoundary = isBoundaryLevel(displayLevel);
      const isLowerRarity = prevInternal === displayLevel;
      
      let newInternal: number;
      
      if (isAtBoundary) {
        if (direction === 1) {
          // At boundary going up: X.0 → X.5 → (X+1).0
          newInternal = isLowerRarity ? displayLevel + BOUNDARY_OFFSET : displayLevel + 1;
        } else {
          // At boundary going down: X.5 → X.0 → (X-1).0
          newInternal = isLowerRarity ? displayLevel - 1 : displayLevel;
        }
      } else {
        // Regular level: increment/decrement with clamping
        newInternal = Math.max(LEVEL_MIN, Math.min(LEVEL_MAX, prevInternal + direction));
        
        // Check if we arrived at a boundary
        const newDisplay = Math.floor(newInternal);
        if (isBoundaryLevel(newDisplay)) {
          // Arriving from below: use X.0 (lower), from above: use X.5 (higher)
          newInternal = direction === 1 ? newDisplay : newDisplay + BOUNDARY_OFFSET;
        }
      }
      
      // Update rarity based on new internal level
      const newDisplayLevel = Math.floor(newInternal);
      const newRarity = isBoundaryLevel(newDisplayLevel)
        ? getRarityAtBoundary(newInternal, newDisplayLevel)
        : getRarityForLevel(newDisplayLevel) || 'Common';
      
      setGlobalRarityState(newRarity);
      return newInternal;
    });
  }, []);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return {
    globalRarity,
    globalLevel: Math.floor(internalLevel),
    setGlobalRarity: handleSetGlobalRarity,
    setGlobalLevel: handleSetGlobalLevel,
    viewMode,
    setViewMode: handleSetViewMode,
  };
};
