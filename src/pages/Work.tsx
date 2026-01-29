
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
// import FooterTunnel from "@/components/FooterTunnel";
import ProjectCard from "@/components/ProjectCard";
import PageTransition from "@/components/PageTransition";

const projects = [
    {
        title: "Nexus Finance",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
        title: "Verdant Health",
        category: "Brand & Digital",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    },
    {
        title: "Quantum Labs",
        category: "Product Design",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
    },
    {
        title: "Atlas Ventures",
        category: "Marketing Campaign",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
    // Duplicating for demo purposes to fill the page
    {
        title: "Echo Systems",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    },
    {
        title: "Stellar Architecture",
        category: "Brand Identity",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    },
];

const Work = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Shared Tooltip State
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    // Mouse tracking for shared tooltip
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for tooltip movement
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        // We want the coordinates relative to the viewport (fixed tooltip) or container?
        // WorkSection uses relative to section. Here the page scrolls.
        // If tooltip is `fixed` (in SharedTooltip), we probably want client coordinates.
        // But WorkSection calculates `e.clientX - rect.left`.
        // Let's use simpler client coordinates for fixed tooltip if possible, or stick to relative if container is relative.

        // In WorkSection, the tooltip is `absolute` inside `relative` section.
        // Here we can do the same. Make the main content relative.

        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <Navbar />

                <main
                    ref={containerRef}
                    className="pt-32 pb-20 relative min-h-screen"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                >
                    <div className="w-full px-6 lg:px-12 xl:px-20">

                        {/* Header */}
                        <div className="mb-20   space-y-6">
                            <span className="text-accent text-sm font-medium tracking-widest uppercase block animate-fade-in">
                                Our Portfolio
                            </span>
                            <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase animate-fade-in [animation-delay:0.1s]">
                                WOrks we did
                            </h1>
                        </div>

                        {/* Project Grid */}
                        <div className="grid md:grid-cols-2 gap-1 animate-fade-in [animation-delay:0.2s]">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={`${project.title}-${index}`}
                                    title={project.title}
                                    category={project.category}
                                    image={project.image}
                                    className="w-full"
                                    onMouseEnter={() => setIsTooltipVisible(true)}
                                    onMouseLeave={() => setIsTooltipVisible(false)}
                                />
                            ))}
                        </div>

                    </div>

                    {/* --- Shared Portal Tooltip --- */}
                    <SharedTooltip
                        active={isTooltipVisible}
                        x={springX}
                        y={springY}
                    />
                </main>
            </div>
        </PageTransition>
    );
};

// Reusing SharedTooltip from WorkSection (duplicated here to avoid export/import refactoring of component internals)
const SharedTooltip = ({ active, x, y }: { active: boolean; x: any; y: any }) => {
    return (
        <motion.div
            className="absolute z-50 pointer-events-none top-0 left-0 hidden lg:flex items-center justify-center mix-blend-difference"
            style={{
                x,
                y,
                marginLeft: -40,
                marginTop: 16,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.5
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div className="bg-white text-black h-20 w-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-[10px] font-bold tracking-widest uppercase">
                    View
                </span>
            </div>
        </motion.div>
    );
};

export default Work;
