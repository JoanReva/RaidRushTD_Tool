import { useState, useCallback } from 'react';

interface UseTowerLevelReturn {
  level: number;
  incrementLevel: () => void;
  decrementLevel: () => void;
  setLevel: (level: number) => void;
}

export const useTowerLevel = (initialLevel = 1, maxLevel = 100): UseTowerLevelReturn => {
  const [level, setLevel] = useState(initialLevel);

  const incrementLevel = useCallback(() => {
    setLevel(prev => Math.min(prev + 1, maxLevel));
  }, [maxLevel]);

  const decrementLevel = useCallback(() => {
    setLevel(prev => Math.max(prev - 1, 1));
  }, []);

  return { level, incrementLevel, decrementLevel, setLevel };
};
