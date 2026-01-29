import { useState, useRef, useEffect, useCallback } from "react";
import { useLenis } from "@studio-freight/react-lenis";

export default function CustomScrollbar() {
    const [thumbHeight, setThumbHeight] = useState(40);
    const [thumbTop, setThumbTop] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [trackHeight, setTrackHeight] = useState(200);
    const trackHeightRef = useRef(200);

    const trackRef = useRef<HTMLDivElement>(null);
    const lenisInstanceRef = useRef<any>(null);

    // Initial calculation and resize handler for responsiveness
    useEffect(() => {
        const updateTrackHeight = () => {
            const isMobile = window.innerWidth < 768;
            const height = isMobile ? 120 : 200;
            setTrackHeight(height);
            trackHeightRef.current = height;
        };

        updateTrackHeight();
        window.addEventListener('resize', updateTrackHeight);
        return () => window.removeEventListener('resize', updateTrackHeight);

    }, []);

    useLenis((lenis) => {
        lenisInstanceRef.current = lenis;
        const { progress, limit } = lenis;
        // If content is shorter than viewport, lenis limit might be close to 0
        // progress is 0..1

        const currentTrackHeight = trackHeightRef.current;

        const windowHeight = window.innerHeight;
        const totalContentHeight = limit + windowHeight;

        // Calculate ratio of viewport to total content
        const viewportRatio = windowHeight / totalContentHeight;

        // Calculate thumb height relative to track height
        const calculatedThumbHeight = viewportRatio * currentTrackHeight;

        // Clamp thumb height:
        // Min: 20px (so it's always graspable/visible)
        // Max: trackHeight (full height if no scrolling needed)
        const finalThumbHeight = Math.min(
            currentTrackHeight,
            Math.max(20, calculatedThumbHeight)
        );

        setThumbHeight(finalThumbHeight);

        // Calculate thumb position within the track
        // Available visual travel distance is (trackHeight - finalThumbHeight)
        // progress * maxTravel
        const maxTop = currentTrackHeight - finalThumbHeight;
        const newTop = progress * maxTop;

        setThumbTop(newTop);
    });

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Prevent text selection/scrolling interaction
        setIsDragging(true);
        setIsHovered(true); // Keep it "hovered" visual state while dragging
    }, []);

    useEffect(() => {
        if (!isDragging) return;

        const handleDragMove = (e: MouseEvent | TouchEvent) => {
            if (!trackRef.current || !lenisInstanceRef.current) return;

            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const trackRect = trackRef.current.getBoundingClientRect();

            // Calculate cursor position relative to track top
            const relativeY = clientY - trackRect.top;

            // Calculate the valid range of movement for the center of the thumb or just map raw Y
            // But usually we emulate the scroll position.
            // Let's map relativeY to progress.
            // visual range = trackHeight - thumbHeight

            const maxTravel = trackHeight - thumbHeight;

            // We want the interaction to feel like we are dragging the *center* of the thumb? 
            // Or just the top? For simplicity, let's assume we are setting the top. 
            // Better: subtract half thumb height to center drag.

            let newTop = relativeY - (thumbHeight / 2);

            // Clamp newTop
            newTop = Math.max(0, Math.min(maxTravel, newTop));

            const newProgress = newTop / maxTravel;

            // Lenis scrollTo expects a target (px) or element. 
            // We know progress 0..1 corresponds to 0..limit
            const targetScroll = newProgress * lenisInstanceRef.current.limit;

            lenisInstanceRef.current.scrollTo(targetScroll, { immediate: true });
        };

        const handleDragEnd = () => {
            setIsDragging(false);
            setIsHovered(false);
        };

        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchmove', handleDragMove, { passive: false });
        window.addEventListener('touchend', handleDragEnd);

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, thumbHeight]);


    return (
        <div
            ref={trackRef}
            className={`fixed right-2 md:right-3 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center justify-center transition-all duration-300 ease-out select-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"
                }`}
            style={{
                height: `${trackHeight}px`,
                width: (isHovered || isDragging) ? "12px" : "6px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => !isDragging && setIsHovered(false)}
            onMouseDown={(e) => {
                // Allow clicking track to jump? 
                // If we click the track but NOT the thumb, maybe jump. 
                // For now, let's just make sure the individual pieces don't block
                handleDragStart(e);
            }}
            onTouchStart={handleDragStart}
        >
            {/* Track Background - subtle glass effect */}
            <div
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                    backgroundColor: (isHovered || isDragging) ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(4px)"
                }}
            />

            {/* Thumb */}
            <div
                className="w-full rounded-full absolute top-0 transition-colors duration-300"
                style={{
                    height: `${thumbHeight}px`,
                    transform: `translateY(${thumbTop}px)`,
                    backgroundColor: (isHovered || isDragging) ? "hsl(189, 52%, 58%)" : "rgba(255, 255, 255, 0.5)",
                    boxShadow: (isHovered || isDragging) ? "0 0 15px hsl(189, 52%, 58%)" : "none",
                }}
            />
        </div>
    );
}
