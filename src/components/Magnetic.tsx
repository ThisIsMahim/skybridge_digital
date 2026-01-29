import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    strength?: number; // How far it moves. Default: 0.5 (half the distance from center)
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5, className, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();

            // Calculate distance from center
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Move the element
            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            className={`inline-block cursor-pointer ${className || ''}`}
            {...props}
        >
            {React.cloneElement(children)}
        </div>
    );
};
