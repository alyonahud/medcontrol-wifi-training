import { useLayoutEffect, useState } from 'react';

export const DESIGN_WIDTH = 1440;
export const DESIGN_HEIGHT = 1024;

function getScale() {
  return Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
}

export function useFitScale() {
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') {
      return 1;
    }

    return getScale();
  });

  useLayoutEffect(() => {
    const updateScale = () => {
      setScale(getScale());
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}
