import { useRef, useId, useEffect, useCallback } from "react";
import { gsap } from "gsap";

export const useLiquidDistortion = () => {
    const id = useId().replace(/:/g, "");
    const filterId = `liquid-filter-${id}`;
    const turbRef = useRef<SVGFETurbulenceElement>(null);
    const dispRef = useRef<SVGFEDisplacementMapElement>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const rippleTlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const turb = turbRef.current;
        const disp = dispRef.current;

        if (!turb || !disp) return;

        // Distortion Pulse
        tlRef.current = gsap.timeline({ paused: true })
            .to(disp, {
                attr: { scale: 30 },
                duration: 0.2,
                ease: "power2.out",
            })
            .to(disp, {
                attr: { scale: 0 },
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
            });

        // Continuous Ripple
        rippleTlRef.current = gsap.timeline({ paused: true, repeat: -1, yoyo: true })
            .to(turb, {
                attr: { baseFrequency: "0.02 0.03" },
                duration: 2,
                ease: "sine.inOut"
            });

        return () => {
            tlRef.current?.kill();
            rippleTlRef.current?.kill();
        };
    }, []);

    const onMouseEnter = useCallback(() => {
        tlRef.current?.restart();
        rippleTlRef.current?.play();
    }, []);

    const onMouseLeave = useCallback(() => {
        rippleTlRef.current?.pause();
        if (turbRef.current) {
            gsap.to(turbRef.current, { attr: { baseFrequency: "0.01 0.02" }, duration: 0.5 });
        }
    }, []);

    const LiquidFilter = (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
            <defs>
                <filter id={filterId}>
                    <feTurbulence
                        ref={turbRef}
                        type="fractalNoise"
                        baseFrequency="0.01 0.02"
                        numOctaves="1"
                        result="warp"
                    />
                    <feDisplacementMap
                        ref={dispRef}
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="0"
                        in="SourceGraphic"
                        in2="warp"
                    />
                </filter>
            </defs>
        </svg>
    );

    return {
        style: { filter: `url(#${filterId})` },
        props: {
            onMouseEnter,
            onMouseLeave
        },
        LiquidFilter
    };
};
