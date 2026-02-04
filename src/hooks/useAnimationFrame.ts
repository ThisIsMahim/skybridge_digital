import { useEffect, useRef } from "react";

export const useAnimationFrame = (
  callback: (deltaTime: number) => void,
  isActive: boolean = true
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Keep callback ref updated to avoid dependency issues
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      previousTimeRef.current = undefined;
      return;
    }

    const animate = (time: number) => {
      // Initialize previousTimeRef on first frame
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }

      const deltaTime = time - previousTimeRef.current;
      
      // Cap deltaTime to avoid huge jumps if tab was inactive (optional safety)
      // 100ms max frame time
      const safeDeltaTime = Math.min(deltaTime, 100); 
      
      callbackRef.current(safeDeltaTime);
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive]);
};
