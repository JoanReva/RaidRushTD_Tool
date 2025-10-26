import { useState, useMemo } from 'react';
import type { Rarity, ViewMode } from '../types/tower';

export const useAppState = () => {
  const [globalRarity, setGlobalRarity] = useState<Rarity>('Common');
  const [viewMode, setViewMode] = useState<ViewMode>('simple');

  return useMemo(
    () => ({
      globalRarity,
      setGlobalRarity,
      viewMode,
      setViewMode,
    }),
    [globalRarity, viewMode]
  );
};
