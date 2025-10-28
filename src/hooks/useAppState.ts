import { useState, useCallback } from 'react';
import type { Rarity, ViewMode } from '../types/tower';
import { getMinLevel, getRarityForLevel } from '../constants/levelScaling';

/**
 * Internal level system:
 * - Regular levels: 1, 2, 3, ..., 59, 60
 * - Boundary levels have TWO states:
 *   - 10.0 = Common(10)
 *   - 10.5 = Good(10)
 *   - 20.0 = Good(20)
 *   - 20.5 = Rare(20)
 *   etc.
 * 
 * Display level is always Math.floor(internalLevel)
 */

export const useAppState = () => {
  const [globalRarity, setGlobalRarityState] = useState<Rarity>('Common');
  // Internal level can be X.0 or X.5 for boundary levels
  const [internalLevel, setInternalLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  // When rarity changes (user clicks rarity selector)
  const handleSetGlobalRarity = useCallback((rarity: Rarity) => {
    // Go to the maximum level of the selected rarity (multiples of 10)
    // Except Common which starts at 1
    const targetLevel = rarity === 'Common' ? 1 : getMinLevel(rarity) + 9; // 10, 20, 30, 40, 50, 60
    
    // For boundary levels (10, 20, 30, 40, 50), use X.5 to indicate higher rarity
    const isBoundary = targetLevel % 10 === 0 && targetLevel < 60;
    const internal = isBoundary ? targetLevel + 0.5 : targetLevel;
    
    setGlobalRarityState(rarity);
    setInternalLevel(internal);
  }, []);

  // When level changes (user clicks level +/- buttons)
  const handleSetGlobalLevel = useCallback((direction: 1 | -1) => {
    setInternalLevel(prevInternal => {
      const displayLevel = Math.floor(prevInternal);
      const isAtBoundary = displayLevel % 10 === 0 && displayLevel < 60;
      const isLowerRarity = prevInternal === displayLevel; // X.0 = lower rarity
      const isHigherRarity = prevInternal > displayLevel; // X.5 = higher rarity
      
      let newInternal = prevInternal;
      
      if (direction === 1) {
        // Moving UP [+]
        if (isAtBoundary && isLowerRarity) {
          // At boundary in lower rarity: switch to higher rarity (same display level)
          // Example: 50.0 (Epic+) → 50.5 (Legendary)
          newInternal = displayLevel + 0.5;
        } else if (isAtBoundary && isHigherRarity) {
          // At boundary in higher rarity: move to next level
          // Example: 50.5 (Legendary) → 51.0 (Legendary)
          newInternal = displayLevel + 1;
        } else {
          // Regular level: increment normally
          newInternal = Math.min(prevInternal + 1, 60);
          
          // Check if we arrived at a new boundary (from below)
          const newDisplay = Math.floor(newInternal);
          const arrivedAtBoundary = newDisplay % 10 === 0 && newDisplay < 60;
          if (arrivedAtBoundary) {
            // Arriving at boundary from below: use lower rarity (X.0)
            // Example: 49 → 50.0 (Epic+)
            newInternal = newDisplay;
          }
        }
      } else {
        // Moving DOWN [-]
        if (isAtBoundary && isHigherRarity) {
          // At boundary in higher rarity: switch to lower rarity (same display level)
          // Example: 50.5 (Legendary) → 50.0 (Epic+)
          newInternal = displayLevel;
        } else if (isAtBoundary && isLowerRarity) {
          // At boundary in lower rarity: move to previous level
          // Example: 50.0 (Epic+) → 49.0 (Epic+)
          newInternal = displayLevel - 1;
        } else {
          // Regular level: decrement normally
          newInternal = Math.max(prevInternal - 1, 1);
          
          // Check if we arrived at a boundary (from above)
          const newDisplay = Math.floor(newInternal);
          const arrivedAtBoundary = newDisplay % 10 === 0 && newDisplay < 60;
          if (arrivedAtBoundary) {
            // Arriving at boundary from above: use higher rarity (X.5)
            // Example: 51 → 50.5 (Legendary)
            newInternal = newDisplay + 0.5;
          }
        }
      }
      
      // Update rarity based on internal level
      const newDisplayLevel = Math.floor(newInternal);
      const newIsAtBoundary = newDisplayLevel % 10 === 0 && newDisplayLevel < 60;
      
      let newRarity: Rarity;
      if (newIsAtBoundary) {
        // At boundary: check if X.0 (lower) or X.5 (higher)
        if (newInternal === newDisplayLevel) {
          // X.0 = lower rarity
          newRarity = getRarityForLevel(newDisplayLevel - 1) || 'Common';
        } else {
          // X.5 = higher rarity
          newRarity = getRarityForLevel(newDisplayLevel + 1) || 'Common';
        }
      } else {
        // Regular level
        newRarity = getRarityForLevel(newDisplayLevel) || 'Common';
      }
      
      setGlobalRarityState(newRarity);
      return newInternal;
    });
  }, []);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return {
    globalRarity,
    globalLevel: Math.floor(internalLevel), // Display level is always integer
    setGlobalRarity: handleSetGlobalRarity,
    setGlobalLevel: handleSetGlobalLevel,
    viewMode,
    setViewMode: handleSetViewMode,
  };
};
