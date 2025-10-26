import { useState, useCallback } from 'react';
import type { Rarity, ViewMode } from '../types/tower';

export const useAppState = () => {
  const [globalRarity, setGlobalRarity] = useState<Rarity>('Common');
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  const handleSetGlobalRarity = useCallback((rarity: Rarity) => {
    setGlobalRarity(rarity);
  }, []);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return {
    globalRarity,
    setGlobalRarity: handleSetGlobalRarity,
    viewMode,
    setViewMode: handleSetViewMode,
  };
};
