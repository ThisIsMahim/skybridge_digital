import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CYAN_COLOR = 'hsl(189, 52%, 58%)';

function MinimalObject() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Configuration
    const size = 2.2;

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const mouse = state.mouse;

        // 1. Slow, elegant rotation
        meshRef.current.rotation.y = time * 0.15;
        meshRef.current.rotation.x = time * 0.05;

        // 2. Subtle Mouse Parallax (Tilting)
        // We only tilt slightly to acknowledge presence, keeping it minimal.
        const targetTiltX = mouse.y * 0.1;
        const targetTiltY = mouse.x * 0.1;

        meshRef.current.rotation.x += (targetTiltX - meshRef.current.rotation.x) * 0.02;
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetTiltY, 0.02);
    });

    const material = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color(CYAN_COLOR),
        wireframe: true,
        transparent: true,
        opacity: 0.3, // Very subtle
    }), []);

    return (
        <mesh ref={meshRef} position={[1, 0, 0]}>
            {/* 
        Icosahedron is clean and techy.
        Detail = 0 gives that classic low-poly look.
      */}
            <icosahedronGeometry args={[size, 0]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
}

export default function Hero3DScene() {
    // Detect mobile for performance optimization
    const [isMobile] = useState(() =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
    );

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{
                    alpha: true,
                    antialias: !isMobile,  // Disable AA on mobile for performance
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false
                }}
                dpr={isMobile ? 1 : [1, 1.5]}  // Lower DPR on mobile
                frameloop="always"  // Keep always for smooth animation
            >
                <MinimalObject />
            </Canvas>
        </div>
    );
}
