import { useState, useRef, useEffect } from "react";

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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-12 lg:py-16 relative overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 space-y-4">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-4xl lg:text-6xl xl:text-[6vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
            Selected
            <br />
            Work
          </h2>
        </div>

        {/* Project Grid - Full width, minimal */}
        <div
          className="grid md:grid-cols-2 gap-4 lg:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              category={project.category}
              image={project.image}
              className="w-full"
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12">
          <LiquidDistortion>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-4 text-foreground hover:text-accent transition-colors group"
            >
              <span className="text-xs uppercase tracking-widest font-bold">View all projects</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-2"
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
            </a>
          </LiquidDistortion>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;