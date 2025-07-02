import { useCallback } from 'react';

export const useCapitalizeEachWord = () => {
  const capitalize = useCallback((text: string) => {
    return text
      .toLowerCase()
      .split(' ')
      .filter(word => word.trim() !== '')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, []);

  return { capitalize };
};
