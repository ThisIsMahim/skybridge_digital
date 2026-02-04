import { useRef, useCallback } from 'react';

interface Vector2 {
  x: number;
  y: number;
}

interface PhysicsState {
  position: Vector2;
  velocity: Vector2;
}

interface PhysicsOptions {
  drag?: number;         // Air resistance (0-1)
  bounce?: number;       // Bounciness (0-1, 1 = perfect elastic)
  radius?: number;       // Radius of the object logic
  gravity?: number;      // Gravity force
  maxSpeed?: number;     // Maximum speed cap
  wander?: number;       // Random wandering force (0-1)
}

export const useBouncingPhysics = (
  initialState: PhysicsState,
  options: PhysicsOptions = {}
) => {
  const {
    drag = 0,
    bounce = 1,
    radius = 28, // Default 56px roughly
    gravity = 0,
    maxSpeed = 10,
    wander = 0,
  } = options;

  const stateRef = useRef<PhysicsState>(initialState);
  // Keep track of a wandering angle for smooth turning
  const wanderAngleRef = useRef(Math.random() * Math.PI * 2);

  const reset = useCallback((newState: PhysicsState) => {
    stateRef.current = newState;
  }, []);

  const update = useCallback((deltaTime: number, bounds: { width: number; height: number }) => {
    const state = stateRef.current;
    
    // Normalize time step (assuming 60fps target, so 16.67ms is 1 unit)
    const timeScale = deltaTime / 16.67;

    // Apply forces
    let vx = state.velocity.x;
    let vy = state.velocity.y;

    // Apply gravity
    if (gravity !== 0) {
      vy += gravity * timeScale;
    }

    // Apply Drag (air resistance)
    if (drag > 0) {
        vx *= (1 - drag * 0.01 * timeScale);
        vy *= (1 - drag * 0.01 * timeScale);
    }
    
    // Apply Wander (natural curvature)
    if (wander > 0) {
        // Change angle slightly each frame
        wanderAngleRef.current += (Math.random() - 0.5) * 0.5; // Random turn
        
        // Add small force in that direction
        const wanderForce = wander * 0.05;
        vx += Math.cos(wanderAngleRef.current) * wanderForce * timeScale;
        vy += Math.sin(wanderAngleRef.current) * wanderForce * timeScale;
    }

    // Cap speed
    const currentSpeed = Math.sqrt(vx * vx + vy * vy);
    if (currentSpeed > maxSpeed) {
        const scale = maxSpeed / currentSpeed;
        vx *= scale;
        vy *= scale;
    }

    // Update position
    let x = state.position.x + vx * timeScale;
    let y = state.position.y + vy * timeScale;

    // Boundary Checks & Collision Response
    
    // Right wall
    if (x + radius * 2 > bounds.width) {
      x = bounds.width - radius * 2;
      vx = -Math.abs(vx) * bounce;
      wanderAngleRef.current = Math.PI - wanderAngleRef.current; // Reflect angle roughly
    } 
    // Left wall
    else if (x < 0) {
      x = 0;
      vx = Math.abs(vx) * bounce;
      wanderAngleRef.current = Math.PI - wanderAngleRef.current;
    }

    // Bottom floor
    if (y + radius * 2 > bounds.height) {
      y = bounds.height - radius * 2;
      vy = -Math.abs(vy) * bounce;
      wanderAngleRef.current = -wanderAngleRef.current;
    } 
    // Top ceiling
    else if (y < 0) {
      y = 0;
      vy = Math.abs(vy) * bounce;
      wanderAngleRef.current = -wanderAngleRef.current;
    }

    // Update state
    state.position.x = x;
    state.position.y = y;
    state.velocity.x = vx;
    state.velocity.y = vy;

    return state;
  }, [bounce, drag, gravity, radius, maxSpeed, wander]);

  return {
    update,
    reset,
    // Expose current ref if needed for non-loop access
    getCurrentState: () => stateRef.current
  };
};
