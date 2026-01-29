import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Check if device is touch/mobile
    useEffect(() => {
        const checkTouchDevice = () => {
            const isTouchCapable =
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches ||
                window.innerWidth <= 1024;
            setIsTouchDevice(isTouchCapable);
        };

        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);

        return () => window.removeEventListener('resize', checkTouchDevice);
    }, []);

    useEffect(() => {
        // Don't run cursor logic on touch devices
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Initial check to ensure cursor is not hidden
        setIsVisible(true);

        // Center anchor point
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        // Performance-optimized position setters
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        // Physics state
        let lastX = 0;
        let lastY = 0;
        let scaleX = 1;
        let scaleY = 1;

        const onMouseMove = (e: MouseEvent) => {
            // Ensure visibility on movement
            if (!isVisible) setIsVisible(true);

            // 1. Move Cursor
            xTo(e.clientX);
            yTo(e.clientY);

            // 2. Fluid Physics (Squash & Stretch)
            const velX = e.clientX - lastX;
            const velY = e.clientY - lastY;

            // Calculate speed and angle
            const speed = Math.sqrt(velX * velX + velY * velY);
            const angle = Math.atan2(velY, velX) * (180 / Math.PI);

            // Stretch based on speed (clamped for subtlety)
            // Less stretch than the ring for a "solid" fluid feel
            const stretch = Math.min(speed * 0.005, 0.5);

            // Apply transformation
            // We overwrite animations to keep it responsive
            gsap.to(cursor, {
                rotation: angle,
                scaleX: (isHovering ? 2.5 : 1) + stretch, // Base scale changes on hover
                scaleY: (isHovering ? 2.5 : 1) - stretch * 0.4,
                duration: 0.1,
                overwrite: 'auto'
            });

            lastX = e.clientX;
            lastY = e.clientY;
        };

        // --- Hover Interactions ---
        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        const addListeners = () => {
            const interactables = document.querySelectorAll('a, button, input, textarea, .interactive, [role="button"]');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        };

        const removeListeners = () => {
            const interactables = document.querySelectorAll('a, button, input, textarea, .interactive, [role="button"]');
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };

        addListeners();
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            removeListeners();
            observer.disconnect();
        };
    }, [isHovering, isVisible, isTouchDevice]); // Re-run effect if hover state changes to update base scale logic if needed (although mostly handled inside mousemove)

    // Reset shape loop
    useEffect(() => {
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const idleCheck = setInterval(() => {
            // Return to proper scale when idle
            const targetScale = isHovering ? 2.5 : 1;
            gsap.to(cursor, {
                scaleX: targetScale,
                scaleY: targetScale,
                duration: 0.3,
                ease: "elastic.out(1, 0.75)"
            });
        }, 100);

        return () => clearInterval(idleCheck);
    }, [isHovering, isTouchDevice]);


    // Don't render cursor on touch/mobile devices
    if (isTouchDevice) return null;

    return (
        <div
            ref={cursorRef}
            className={`
        fixed top-0 left-0 z-[9999] pointer-events-none 
        mix-blend-difference
        flex items-center justify-center
        transition-opacity duration-300
        ${!isVisible ? 'opacity-0' : 'opacity-100'}
      `}
        >
            {/* The Dot */}
            <div className={`
            bg-white rounded-full transition-colors duration-300
            ${isHovering ? 'w-4 h-4 bg-white' : 'w-3 h-3 bg-white'}
            shadow-[0_0_10px_rgba(255,255,255,0.5)]
        `} />
        </div>
    );
};

export default CustomCursor;
