import { useState, useEffect } from 'react';
import { Season } from '@/data/translations';

const getSeasonByMonth = (): Season => {
  const month = new Date().getMonth() + 1; // 1-12
  // Mar-Aug (3-8) = spring-summer, Sep-Feb (9-2) = autumn-winter
  return month >= 3 && month <= 8 ? 'spring-summer' : 'autumn-winter';
};

export const useSeason = () => {
  const [season, setSeason] = useState<Season>(() => {
    const saved = localStorage.getItem('adventurabile-season');
    return (saved as Season) || getSeasonByMonth();
  });

  useEffect(() => {
    localStorage.setItem('adventurabile-season', season);
    const dataSeasonValue = season === 'autumn-winter' ? 'autumn-winter' : '';
    if (dataSeasonValue) {
      document.documentElement.setAttribute('data-season', dataSeasonValue);
    } else {
      document.documentElement.removeAttribute('data-season');
    }
  }, [season]);

  const toggleSeason = () => {
    setSeason(prev => prev === 'spring-summer' ? 'autumn-winter' : 'spring-summer');
  };

  return { season, setSeason, toggleSeason };
};
