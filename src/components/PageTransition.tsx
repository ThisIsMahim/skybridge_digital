import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}



const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-full w-full bg-accent relative"
                        initial={{ y: "100%" }}
                        animate={{ y: "-100%" }}
                        exit={{ y: ["100%", "0%"] }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </div>

            {children}
        </>
    );
};

export default PageTransition;
