import { useState, useRef, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useBouncingPhysics } from "../hooks/useBouncingPhysics";
import { useChatContext } from "../context/ChatContext";
import { useDockingZone } from "../hooks/useDockingZone";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import ChatModal from "./ChatModal";

const BouncingBall = () => {
    // Random starting velocity
    // Random starting velocity - Slower now (range -2 to 2)
    const getRandomVelocity = () => (Math.random() - 0.5) * 4;

    const [bounds, setBounds] = useState({ width: 0, height: 0 });

    // Use MotionValues for high-performance updates without React renders
    const x = useMotionValue(100);
    const y = useMotionValue(100);

    const { update, reset } = useBouncingPhysics({
        position: { x: 100, y: 100 },
        velocity: { x: getRandomVelocity(), y: getRandomVelocity() }
    }, {
        bounce: 1, // Keep momentum
        drag: 0.1, // Slight air resistance
        radius: 28,
        gravity: 0,
        maxSpeed: 3, // Cap speed to be "catchable"
        wander: 0.5 // Add natural wandering motion
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const { isChatDocked, setIsChatDocked, isChatOpen, setIsChatOpen } = useChatContext();
    const { dockingCenter, checkDocking } = useDockingZone();
    const [isHoveringZone, setIsHoveringZone] = useState(false);

    // Initialize bounds on mount and handle resize
    useEffect(() => {
        const handleResize = () => {
            setBounds({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        handleResize(); // Initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation Loop
    useAnimationFrame((deltaTime) => {
        // Pause physics while dragging, hovering, if bounds aren't set, or if docked
        if (bounds.width === 0 || isDragging || isChatDocked || isHovering) return;

        const newState = update(deltaTime, bounds);

        // Sync motion values
        x.set(newState.position.x);
        y.set(newState.position.y);
    });

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDrag = (_: any, info: any) => {
        // Check if we are hovering the drop zone for visual feedback
        const { isWithinSnapZone } = checkDocking(info.point.x, info.point.y);
        setIsHoveringZone(isWithinSnapZone);
    };

    const onDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        setIsHoveringZone(false);

        const { isWithinSnapZone, snapPosition } = checkDocking(x.get(), y.get());

        if (isWithinSnapZone) {
            setIsChatDocked(true);
            // Snap to exact position
            x.set(snapPosition.x);
            y.set(snapPosition.y);
        } else {
            // Resume bouncing
            const velocityScale = 1 / 60;
            reset({
                position: { x: x.get(), y: y.get() },
                velocity: {
                    x: info.velocity.x * velocityScale,
                    y: info.velocity.y * velocityScale
                }
            });
        }
    };

    // If docked, keep it at the snap position even on resize
    useEffect(() => {
        if (isChatDocked && bounds.width > 0) {
            x.set(dockingCenter.x - 28); // 28 is radius
            y.set(dockingCenter.y - 28);
        }
    }, [bounds, isChatDocked, dockingCenter]);

    if (bounds.width === 0) return null; // Prevent flash of 0,0 position

    return (
        <>
            {/* Docking Zone Visual - Only show when dragging */}
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

                        {/* Handwritten Label */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, rotate: -10 }}
                            animate={{ opacity: 1, x: 0, rotate: -10 }}
                            className="absolute bottom-24 right-6 w-40 pointer-events-none"
                        >
                            <span className="text-white/90 text-2xl font-handwriting -rotate-12 block text-center mr-4">
                                AI agent here!!!
                            </span>
                            <svg className="w-16 h-16 text-white/80 absolute right-0 top-6 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                {/* 
                                    Hand-drawn Arc 
                                    M 30 20: Start point (top-left relative to viewBox)
                                    Q 85 20: Control point (pulls the curve 'out' and 'up' to the right)
                                    75 75: End point (bottom-right near the target)
                                */}
                                <path d="M 30 20 Q 85 20 75 75" />

                                {/* Arrowhead - roughly matching the angle at the end of the curve */}
                                <path d="M 75 75 L 82 55" />
                                <path d="M 75 75 L 60 62" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Modal */}
            <AnimatePresence>
                {isChatDocked && isChatOpen && (
                    <ChatModal />
                )}
            </AnimatePresence>

            <motion.div
                layoutId="chat-particle" // Shared layout ID for smooth morphing if we were to split components
                drag={!isChatDocked} // Disable drag when docked
                dragMomentum={false}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={() => {
                    if (isChatDocked) {
                        setIsChatOpen(!isChatOpen);
                    }
                }}
                style={{
                    x,
                    y,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    touchAction: 'none'
                }}
                className={`flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.4)] z-50
                    ${isDragging ? 'cursor-grabbing' : (isChatDocked ? 'cursor-pointer' : 'cursor-grab')}
                    ${isChatDocked ? 'rounded-xl shadow-none' : 'rounded-full'}
                `}
                animate={{
                    width: isChatDocked ? 60 : 56,
                    height: isChatDocked ? 60 : 56,
                    backgroundColor: isChatDocked ? "#ffffff" : "#00E5FF",
                    borderRadius: isChatDocked ? "12px" : "9999px"
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Catch me? Label */}
                <AnimatePresence>
                    {!isChatDocked && !isDragging && !isHovering && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none shadow-lg"
                        >
                            Catch me?
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Show Icon when docked */}
                <AnimatePresence mode="wait">
                    {isChatDocked && (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0, scale: 0, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isChatOpen ? <X className="text-black w-6 h-6" /> : <MessageCircle className="text-black w-6 h-6" />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Simple Overlay when dragging */}
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
