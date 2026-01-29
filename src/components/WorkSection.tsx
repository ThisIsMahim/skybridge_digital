import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { LiquidDistortion } from "./LiquidDistortion";

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
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Shared Tooltip State
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Mouse tracking for shared tooltip
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for tooltip movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Direct client tracking for performance (avoids layout thrashing)
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="min-h-screen py-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 space-y-6">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-4xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
            Selected
            <br />
            Work
          </h2>
        </div>

        {/* Project Grid - Full width, minimal */}
        <div
          className="grid md:grid-cols-2 gap-1"
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              title={project.title}
              category={project.category}
              image={project.image}
              className="w-full"
              onMouseEnter={() => setIsTooltipVisible(true)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 lg:mt-24">
          <LiquidDistortion>
            <Link
              to="/work"
              className="inline-flex items-center gap-4 text-foreground hover:text-accent transition-colors group"
            >
              <span className="text-sm uppercase tracking-widest">View all projects</span>
              <svg
                className="w-6 h-6 transition-transform group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </LiquidDistortion>
        </div>
      </div>

      {/* --- Shared Portal Tooltip --- */}
      <SharedTooltip
        active={isTooltipVisible}
        x={springX}
        y={springY}
      />
    </section>
  );
};

const SharedTooltip = ({ active, x, y }: { active: boolean; x: any; y: any }) => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none top-0 left-0 hidden lg:flex items-center justify-center mix-blend-difference"
      style={{
        x,
        y,
        // Offset tooltip slightly below to not block the cursor/flashlight center
        marginLeft: -40, // Center of 80px width
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

export default WorkSection;