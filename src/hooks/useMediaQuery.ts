import { useLayoutEffect, useState } from 'react';

export enum MediaQueries {
  sm = '(min-width: 640px)',
  md = '(min-width: 768px)',
  lg = '(min-width: 1024px)',
  xl = '(min-width: 1280px)',
  '2xl' = '(min-width: 1400px)'
}

const getMatches = (query: string) => window.matchMedia(query).matches;

export function useMediaQuery(query: MediaQueries) {
  const [matches, setMatches] = useState<boolean>(false);

  const handleChange = () => setMatches(getMatches(query));

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
