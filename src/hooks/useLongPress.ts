import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEventHandler,
  type PointerEventHandler,
} from 'react';

type UseLongPressOptions = {
  duration: number;
  enabled: boolean;
  onComplete: () => void;
};

export function useLongPress({ duration, enabled, onComplete }: UseLongPressOptions) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const clearAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearAnimation();
    completedRef.current = false;
    startedAtRef.current = null;
    setProgress(0);
    setIsHolding(false);
  }, [clearAnimation]);

  const tick = useCallback(
    (time: number) => {
      if (startedAtRef.current === null) {
        startedAtRef.current = time;
      }

      const nextProgress = Math.min((time - startedAtRef.current) / duration, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        completedRef.current = true;
        clearAnimation();
        setIsHolding(false);
        onComplete();
        return;
      }

      animationRef.current = requestAnimationFrame(tick);
    },
    [clearAnimation, duration, onComplete],
  );

  const start = useCallback<PointerEventHandler<HTMLElement>>(
    (event) => {
      if (!enabled) {
        return;
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      reset();
      setIsHolding(true);
      animationRef.current = requestAnimationFrame(tick);
    },
    [enabled, reset, tick],
  );

  const stop = useCallback<PointerEventHandler<HTMLElement>>(
    (event) => {
      if (!enabled) {
        return;
      }

      event.preventDefault();
      event.currentTarget.releasePointerCapture?.(event.pointerId);

      if (!completedRef.current) {
        reset();
      }
    },
    [enabled, reset],
  );

  const handlers = useMemo(
    () => ({
      onPointerDown: start,
      onPointerUp: stop,
      onPointerCancel: stop,
      onPointerLeave: stop,
      onContextMenu: ((event) => event.preventDefault()) as MouseEventHandler<HTMLElement>,
    }),
    [start, stop],
  );

  useEffect(() => reset, [reset]);

  return {
    handlers,
    isHolding,
    progress,
  };
}
