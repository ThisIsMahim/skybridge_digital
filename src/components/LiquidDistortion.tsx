import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLiquidDistortion } from "@/hooks/useLiquidDistortion";

interface LiquidDistortionProps {
    children: React.ReactNode;
    className?: string;
}

export const LiquidDistortion: React.FC<LiquidDistortionProps> = ({
    children,
    className = ""
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { style, props: eventProps, LiquidFilter } = useLiquidDistortion();
    const { onMouseEnter, onMouseLeave } = eventProps;

    // Additional magnetic/scale effect for the wrapper
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const handleEnter = () => {
            onMouseEnter();
            gsap.to(wrapper, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        };

        const handleLeave = () => {
            onMouseLeave();
            gsap.to(wrapper, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        wrapper.addEventListener("mouseenter", handleEnter);
        wrapper.addEventListener("mouseleave", handleLeave);
        return () => {
            wrapper.removeEventListener("mouseenter", handleEnter);
            wrapper.removeEventListener("mouseleave", handleLeave);
        };
    }, [onMouseEnter, onMouseLeave]);

    return (
        <div
            ref={wrapperRef}
            className={`relative inline-block ${className}`}
            style={style}
        >
            {LiquidFilter}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
