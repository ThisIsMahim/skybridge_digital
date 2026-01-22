import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const FluidMesh = () => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { viewport } = useThree();

    // Refs for physics/animation state
    const lastScrollY = useRef(0);
    const accumulatedTime = useRef(0);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(1, 1) }
        }),
        []
    );

    useFrame((state, delta) => {
        if (materialRef.current) {
            // 1. Get Scroll Data
            const currentScrollY = window.scrollY || window.pageYOffset;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
            lastScrollY.current = currentScrollY;

            // 2. Calculate Speeds
            // Base automatic speed
            const baseSpeed = 0.2;
            // Acceleration from scroll (multiplier adjusts sensitivity)
            const scrollAcceleration = scrollDelta * 0.005;

            // 3. Accumulate Time
            // We add to the total time based on the current frame's speed
            accumulatedTime.current += delta * (baseSpeed + scrollAcceleration);

            // 4. Update Uniforms
            materialRef.current.uniforms.uTime.value = accumulatedTime.current;

            // Smooth mouse interpolation
            materialRef.current.uniforms.uMouse.value.lerp(
                new THREE.Vector2(state.pointer.x, state.pointer.y),
                0.05
            );
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      
      // Use uTime directly (which now includes scroll acceleration)
      float flow = sin(uv.x * 3.0 + uTime) + cos(uv.y * 4.0 + uTime * 0.8);
      
      flow += sin(uv.x * 6.0 - uTime * 0.5) * 0.3;

      vec3 color1 = vec3(0.05, 0.23, 0.36); // Deep Blue
      vec3 color2 = vec3(0.0, 0.0, 0.0);    // Black
      vec3 color3 = vec3(0.37, 0.73, 0.8);  // Cyan

      float mixFactor = flow * 0.5 + 0.5;
      mixFactor = smoothstep(0.0, 1.0, mixFactor);

      vec3 finalColor = mix(color1, color2, mixFactor);
      
      float mouseDist = distance(uv, uMouse * 0.5 + 0.5);
      float mouseGlow = 1.0 - smoothstep(0.0, 0.5, mouseDist);
      
      finalColor = mix(finalColor, color3, mouseGlow * 0.15);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

const FluidBackground = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10,
                pointerEvents: 'none',
                background: '#000',
            }}
        >
            <Canvas camera={{ position: [0, 0, 1] }}>
                <FluidMesh />
            </Canvas>
        </div>
    );
};

export default FluidBackground;
