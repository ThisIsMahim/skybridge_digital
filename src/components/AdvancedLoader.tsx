
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdvancedLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: progress === 100 ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            onAnimationComplete={() => {
                if (progress === 100) onComplete();
            }}
            style={{ pointerEvents: progress === 100 ? "none" : "auto" }}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Spinning Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                    className="relative w-[60px] h-[60px]"
                >
                    <div className="absolute inset-0 border-2 border-white" />
                    <motion.div
                        className="absolute -top-[10px] -left-[10px] w-full h-full border-2 border-[#5BCAD5]"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative"
                >
                    <h1 className="font-['Syne'] text-white text-sm md:text-base font-bold tracking-[0.4em] uppercase">
                        Skybridge Systems
                    </h1>
                </motion.div>

                <div className="w-[150px] h-[2px] bg-white/10 overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#5BCAD5]"
                        style={{ width: `${progress}%` }}
                        transition={{ type: "tween", ease: "linear" }}
                    />
                </div>

                <motion.div
                    className="text-white/40 font-['Inter'] text-[10px] tracking-widest"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    LOADING
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdvancedLoader;
