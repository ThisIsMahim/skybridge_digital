import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import skybridgeLogo from '@/assets/skybridge-logo-black-bg-enhanced.png';
import { BookingModal } from "./BookingModal";

gsap.registerPlugin(ScrollTrigger);

const FooterTunnel = () => {
    // Load images using Vite's glob import
    const frameModules = import.meta.glob('../assets/portal-sequence/*.jpg', { eager: true, import: 'default' });
    const frameUrls = Object.keys(frameModules).sort().map(path => frameModules[path] as string);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const mottoRef = useRef<HTMLDivElement>(null);
    const footerTextRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Configuration
    // const frameCount = 149; // Let's assume a reasonable sequence length like 150 frames // Removed
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef({ frame: 0 });

    useEffect(() => {
        // 1. Preload Images
        let loadedCount = 0;
        const totalFrames = frameUrls.length;
        const images: HTMLImageElement[] = [];

        // Create image objects for all URLs
        frameUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                // Continue even if one fails
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            }
            images.push(img);
        });

        imagesRef.current = images;

        // 2. Setup GSAP Setup (wait for images to be reasonably ready, but we can start init)
        // We update the frameCount based on actual loaded files
        const frameCount = frameUrls.length > 0 ? frameUrls.length : 100;

        const ctx = gsap.context(() => {
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // 400vh scroll distance
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                },
            });

            // Canvas Animation (Frame Scrubbing)
            scrollTl.to(currentFrameRef.current, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: 1,
                onUpdate: () => render(), // Render on every frame update
            }, 0);

            // Text Animations (Fade In/Out)
            // 0-20%: "Chaos is just data..."
            const text1 = textContainerRef.current?.querySelector(".text-1");
            const text2 = textContainerRef.current?.querySelector(".text-2");
            const text3 = textContainerRef.current?.querySelector(".text-3");

            if (text1) {
                scrollTl.fromTo(text1, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0);
                scrollTl.to(text1, { opacity: 0, scale: 1.1, duration: 0.1, ease: "power2.in" }, 0.15);
            }

            // 30-50%: "...waiting for a direction."
            if (text2) {
                scrollTl.fromTo(text2, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0.3);
                scrollTl.to(text2, { opacity: 0, scale: 1.1, duration: 0.1, ease: "power2.in" }, 0.45);
            }

            // 60-80%: "Bridge the gap to your reality."
            if (text3) {
                scrollTl.fromTo(text3, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0.6);
                scrollTl.to(text3, { opacity: 0, scale: 1.1, duration: 0.1, ease: "power2.in" }, 0.75);
            }

            // Finale (85-100%): Logo first, then "Start Project" Button
            // We finish animations by 0.9 to create a "dead zone" buffer at the end (0.9-1.0)
            // This prevents re-animation hiccups if the user scrolls deeply or bounces at the bottom.

            // 2. Logo Appears AFTER canvas is mostly faded -> 0.85 start
            if (logoRef.current) {
                gsap.set(logoRef.current, { opacity: 0, scale: 0.9, y: 20 });
                scrollTl.to(logoRef.current, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.1,
                    ease: "power2.out"
                }, 0.85);
            }

            // 2.5 Motto Appears -> 0.88 start
            if (mottoRef.current) {
                gsap.set(mottoRef.current, { opacity: 0, y: 20, letterSpacing: "0.5em" });
                scrollTl.to(mottoRef.current, {
                    opacity: 1,
                    y: 0,
                    letterSpacing: "0.2em", // Collapse tracking for a cool cinematic effect
                    duration: 0.1,
                    ease: "power2.out"
                }, 0.88);
            }

            // 3. Button and Footer Text follow -> 0.92 start
            if (buttonRef.current) {
                gsap.set(buttonRef.current, { opacity: 0, pointerEvents: "none", y: 20 });
                scrollTl.to(buttonRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.08,
                    pointerEvents: "auto",
                    ease: "power2.out"
                }, 0.92);
            }

            // Finale Sequence:
            // 1. Fade out Canvas Tunnel FIRST (Clean slate) -> 0.75 - 0.85
            if (canvasRef.current) {
                scrollTl.to(canvasRef.current, {
                    opacity: 0,
                    duration: 0.1, // Quick fade to black
                    ease: "power2.inOut"
                }, 0.75);
            }

            if (footerTextRef.current) {
                gsap.set(footerTextRef.current, { opacity: 0, y: 10 });
                scrollTl.to(footerTextRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.08,
                    ease: "power2.out"
                }, 0.92);
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Render Loop
    const render = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Image
        const currentFrameIndex = Math.round(currentFrameRef.current.frame);
        const img = imagesRef.current[currentFrameIndex];

        if (img && img.complete && img.naturalHeight !== 0) {
            // Calculation to cover
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            // Add a slight zoom (1.1x) to crop out baked-in letterboxing (black bars)
            const ratio = Math.max(hRatio, vRatio) * 1.1;
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        } else {
            // Fallback if image not ready or failed (render a procedural cool effect)
            drawFallback(ctx, canvas.width, canvas.height, currentFrameIndex);
        }
    };

    const drawFallback = (ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
        // Procedural tunnel effect as fallback
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const maxRadius = Math.max(width, height) * 0.8;

        // Animated grid/tunnel
        ctx.strokeStyle = `rgba(0, 255, 255, 0.3)`; // Cyan
        ctx.lineWidth = 2;

        // Concentric circles moving outwards
        const count = 10;
        const speed = (frame % 50) / 20;

        for (let i = 0; i < count; i++) {
            const progress = (i + (frame * 0.1)) % count; // 0 to count
            const r = Math.pow(progress / count, 2) * maxRadius; // exponential for depth
            const alpha = progress / count;

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.5})`;
            ctx.stroke();
        }

        // Radial lines
        const lines = 12;
        for (let i = 0; i < lines; i++) {
            const angle = (i / lines) * Math.PI * 2 + (frame * 0.01);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * maxRadius, cy + Math.sin(angle) * maxRadius);
            ctx.strokeStyle = `rgba(0, 255, 255, 0.1)`;
            ctx.stroke();
        }
    }

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Use documentElement.clientWidth to exclude scrollbar width, preventing horizontal scrollbar
                canvasRef.current.width = document.documentElement.clientWidth;
                canvasRef.current.height = window.innerHeight;
                render(); // Re-render immediately
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden z-20">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-50 blur-[.5px] w-full h-full pointer-events-none"
            />

            {/* Foreground Text Container */}
            <div
                ref={textContainerRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
                <h2 className="text-1 absolute text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mix-blend-overlay opacity-0 font-display">
                    Chaos is just data...
                </h2>
                <h2 className="text-2 absolute text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mix-blend-overlay opacity-0 font-display">
                    ...waiting for a direction.
                </h2>
                <h2 className="text-3 absolute text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mix-blend-overlay opacity-0 font-display">
                    Bridge the gap to your reality.
                </h2>
            </div>

            {/* Finale Elements */}
            <div className="absolute inset-x-0 bottom-[15%] md:bottom-[20%] flex flex-col items-center justify-center gap-10 z-30 pointer-events-none">
                <div ref={logoRef} className="opacity-0">
                    <img
                        src={skybridgeLogo}
                        alt="SkyBridge Digital"
                        className="w-[300px] md:w-[400px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    />
                </div>

                <div ref={mottoRef} className="opacity-0">
                    <p className="text-white/60 text-xs md:text-sm font-medium uppercase font-display text-center max-w-lg">
                        Bridging the <span className="text-cyan-400/80">Gap</span> between you and your customer since 2021
                    </p>
                </div>

                <div ref={buttonRef} className="opacity-0 flex flex-col md:flex-row gap-6 items-center">
                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="pointer-events-auto border-white/20 hover:border-cyan-400 bg-transparent text-white hover:bg-cyan-950/30 hover:text-cyan-400 uppercase tracking-widest text-lg px-8 py-8 rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                    >
                        <Link to="/contact">
                            Start Project
                        </Link>
                    </Button>

                    <BookingModal>
                        <Button
                            size="lg"
                            className="pointer-events-auto bg-white text-black hover:bg-white/90 border border-transparent uppercase tracking-widest text-lg px-8 py-8 rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                        >
                            Book A Call
                        </Button>
                    </BookingModal>
                </div>
            </div>

            {/* Footer Elements pinned at very bottom */}
            <div ref={footerTextRef} className="opacity-0 absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs uppercase tracking-widest z-30">
                &copy; {new Date().getFullYear()} SkyBridge Digital. All rights reserved.
            </div>
        </div>
    );
};

export default FooterTunnel;
