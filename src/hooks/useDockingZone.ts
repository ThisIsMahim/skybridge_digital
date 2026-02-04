import { useState, useCallback, useEffect } from 'react';

interface DockingZoneOptions {
  threshold?: number; // Distance to trigger snap
  position?: { bottom: number; right: number }; // Offset from bottom-right corner
}

export const useDockingZone = (options: DockingZoneOptions = {}) => {
  const { 
    threshold = 100, // Reaching slightly further than just 50px for better UX, specific 50px internal request used in logic
    position = { bottom: 32 + 28, right: 32 + 28 } // Center of FAB (bottom-8 right-8, 56px size)
  } = options;

  const [dockingCenter, setDockingCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      setDockingCenter({
        x: window.innerWidth - position.right,
        y: window.innerHeight - position.bottom
      });
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, [position.right, position.bottom]);

  const checkDocking = useCallback((ballX: number, ballY: number, ballRadius: number = 28) => {
    const ballCenter = {
      x: ballX + ballRadius,
      y: ballY + ballRadius
    };

    const dx = ballCenter.x - dockingCenter.x;
    const dy = ballCenter.y - dockingCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // User requested "within 50px of the zone"
    // We'll treat the threshold as this value
    const isWithinSnapZone = distance < 50; 

    return {
      distance,
      isWithinSnapZone,
      snapPosition: {
        x: dockingCenter.x - ballRadius,
        y: dockingCenter.y - ballRadius
      }
    };
  }, [dockingCenter]);

  return {
    dockingCenter,
    checkDocking
  };
};
