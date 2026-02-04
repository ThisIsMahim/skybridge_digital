import { motion } from "framer-motion";
import { useState } from "react";

const InitialLoadReveal = () => {
    const [complete, setComplete] = useState(false);

    if (complete) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="h-full w-full bg-accent relative"
                    initial={{ y: "0%" }}
                    animate={{ y: "-100%" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: i * 0.1,
                    }}
                    onAnimationComplete={() => {
                        if (i === 4) {
                            setComplete(true);
                        }
                    }}
                    style={{
                        willChange: "transform",
                    }}
                />
            ))}
        </div>
    );
};

export default InitialLoadReveal;
