import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SparklesProps {
    isActive: boolean;
    className?: string;
}

interface Sparkle {
    id: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
    delay: number;
}

const Star = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

export const Sparkles = ({ isActive, className }: SparklesProps) => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        if (!isActive) {
            setSparkles([]);
            return;
        }

        const interval = setInterval(() => {
            const id = Math.random().toString(36).slice(2, 9);
            const newSparkle: Sparkle = {
                id,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 8 + 4, // 4px to 12px
                rotation: Math.random() * 360,
                delay: 0
            };
            setSparkles(prev => [...prev.slice(-8), newSparkle]); // Keep fewer to avoid clutter
        }, 200);

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className={cn("absolute inset-0 pointer-events-none z-20 overflow-visible", className)}>
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                            rotate: sparkle.rotation
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0],
                            rotate: sparkle.rotation + 45
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                        style={{ width: sparkle.size, height: sparkle.size }}
                    >
                        <Star className="w-full h-full" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
