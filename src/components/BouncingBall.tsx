import { useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useBouncingPhysics } from "../hooks/useBouncingPhysics";
import { useChatContext } from "../context/ChatContext";
import { useDockingZone } from "../hooks/useDockingZone";
import { motion, useMotionValue, AnimatePresence, useTransform } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import ChatModal from "./ChatModal";

const BouncingBall = () => {
    const getRandomVelocity = () => (Math.random() - 0.5) * 4;

    const [bounds, setBounds] = useState({ width: 0, height: 0 });

    // Use MotionValues for high-performance updates
    const x = useMotionValue(100);
    const y = useMotionValue(100);
    const velocityX = useMotionValue(0);

    // Transform velocity to direction flip (1 or -1)
    // We update velocityX in the animation loop
    const scaleX = useTransform(velocityX, (latest) => {
        if (Math.abs(latest) < 0.1) return 1; // Default to right if stationary
        return latest >= 0 ? 1 : -1;
    });

    const { update, reset } = useBouncingPhysics({
        position: { x: 100, y: 100 },
        velocity: { x: getRandomVelocity(), y: getRandomVelocity() }
    }, {
        bounce: 1,
        drag: 0.1,
        radius: 30, // Slightly larger for the bird
        gravity: 0,
        maxSpeed: 3,
        wander: 0.5
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const { isChatDocked, setIsChatDocked, isChatOpen, setIsChatOpen } = useChatContext();
    const { dockingCenter, checkDocking } = useDockingZone();
    const [isHoveringZone, setIsHoveringZone] = useState(false);

    // Performance: Detect mobile and limit FPS
    const [isMobile] = useState(() =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
    );
    const FPS_LIMIT = isMobile ? 30 : 60;  // Half framerate on mobile for performance
    const lastFrameTimeRef = useState({ current: 0 })[0];

    useEffect(() => {
        const handleResize = () => {
            setBounds({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useAnimationFrame((deltaTime) => {
        if (bounds.width === 0 || isDragging || isChatDocked || isHovering) return;

        // FPS limiting for performance on mobile
        const now = performance.now();
        if (now - lastFrameTimeRef.current < 1000 / FPS_LIMIT) return;
        lastFrameTimeRef.current = now;

        const newState = update(deltaTime, bounds);

        x.set(newState.position.x);
        y.set(newState.position.y);
        velocityX.set(newState.velocity.x);
    });

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDrag = (_: any, info: any) => {
        const { isWithinSnapZone } = checkDocking(info.point.x, info.point.y);
        setIsHoveringZone(isWithinSnapZone);
    };

    const onDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        setIsHoveringZone(false);

        const { isWithinSnapZone, snapPosition } = checkDocking(x.get(), y.get());

        if (isWithinSnapZone) {
            setIsChatDocked(true);
            x.set(snapPosition.x);
            y.set(snapPosition.y);
        } else {
            const velocityScale = 1 / 60;
            reset({
                position: { x: x.get(), y: y.get() },
                velocity: {
                    x: info.velocity.x * velocityScale,
                    y: info.velocity.y * velocityScale
                }
            });
            // Update direction based on throw
            velocityX.set(info.velocity.x);
        }
    };

    useEffect(() => {
        if (isChatDocked && bounds.width > 0) {
            x.set(dockingCenter.x - 30);
            y.set(dockingCenter.y - 30);
        }
    }, [bounds, isChatDocked, dockingCenter]);

    if (bounds.width === 0) return null;

    return (
        <>
            <AnimatePresence>
                {isDragging && !isChatDocked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: isHoveringZone ? 1.2 : 1,
                            borderColor: isHoveringZone ? "#00E5FF" : "rgba(255,255,255,0.2)"
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-8 right-8 w-14 h-14 rounded-full border-2 border-dashed z-40 flex items-center justify-center pointer-events-none"
                    >
                        <div className={`w-2 h-2 rounded-full ${isHoveringZone ? 'bg-cyan-400' : 'bg-white/20'}`} />
                        <motion.div
                            initial={{ opacity: 0, x: -20, rotate: -10 }}
                            animate={{ opacity: 1, x: 0, rotate: -10 }}
                            className="absolute bottom-24 right-6 w-40 pointer-events-none"
                        >
                            <span className="text-white/90 text-2xl font-handwriting -rotate-12 block text-center mr-4">
                                AI agent here!!!
                            </span>
                            <svg className="w-16 h-16 text-white/80 absolute right-0 top-6 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M 30 20 Q 85 20 75 75" />
                                <path d="M 75 75 L 82 55" />
                                <path d="M 75 75 L 60 62" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatDocked && isChatOpen && <ChatModal />}
            </AnimatePresence>

            {/* Bird Container */}
            <motion.div
                layoutId="chat-particle"
                drag={!isChatDocked}
                dragMomentum={false}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={() => isChatDocked && setIsChatOpen(!isChatOpen)}
                style={{
                    x,
                    y,
                    top: 0,
                    left: 0
                }}
                className={`fixed z-50 touch-none flex items-center justify-center
                    ${isDragging ? 'cursor-grabbing' : (isChatDocked ? 'cursor-pointer' : 'cursor-grab')}
                `}
            >
                {/* SVG Bird Animation */}
                {!isChatDocked ? (
                    <motion.div
                        style={{ scaleX }}
                        className="relative w-16 h-16 filter drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                    >
                        <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
                            {/* Wings Group - Flapping Animation */}
                            <motion.g
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                {/* Back Wing */}
                                <motion.path
                                    d="M25 45 C 10 35, 10 15, 40 25"
                                    fill="#00B8D4"
                                    animate={{
                                        d: [
                                            "M25 45 C 10 35, 10 15, 40 25", // Up
                                            "M25 45 C 10 50, 20 65, 40 25"  // Down
                                        ]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.25,
                                        repeatType: "mirror", // Flaps smoothly
                                        ease: "circInOut"
                                    }}
                                />

                                {/* Body */}
                                <path
                                    d="M20 45 C 20 20, 70 20, 80 40 C 90 60, 50 70, 20 45"
                                    fill="#00E5FF"
                                />

                                {/* Eye */}
                                <circle cx="70" cy="38" r="3" fill="white" />
                                <circle cx="71.5" cy="37" r="1.5" fill="black" />

                                {/* Beak */}
                                <path d="M80 40 L 95 42 L 82 48 Z" fill="#FFC107" />

                                {/* Front Wing */}
                                <motion.path
                                    d="M30 45 C 15 35, 15 5, 50 30"
                                    fill="#84FFFF"
                                    animate={{
                                        d: [
                                            "M30 45 C 15 35, 15 5, 50 30", // Up
                                            "M30 45 C 15 55, 25 75, 50 30"  // Down
                                        ]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.25,
                                        repeatType: "mirror",
                                        ease: "circInOut"
                                    }}
                                />
                            </motion.g>
                        </svg>
                    </motion.div>
                ) : (
                    // Docked State - Clean Circle Icon
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, backgroundColor: "#ffffff", borderRadius: "12px" }}
                        className="w-[60px] h-[60px] flex items-center justify-center bg-white rounded-xl shadow-lg"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isChatOpen ? "close" : "open"}
                                initial={{ rotate: -45, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 45, opacity: 0 }}
                            >
                                {isChatOpen ? <X className="text-black w-6 h-6" /> : <MessageCircle className="text-black w-6 h-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Catch me? Label */}
                <AnimatePresence>
                    {!isChatDocked && !isDragging && !isHovering && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none shadow-lg"
                        >
                            Catch me?
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Backdrop */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default BouncingBall;
