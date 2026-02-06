import { useState, useRef, useEffect } from "react";

import ProjectCard from "./ProjectCard";
import { LiquidDistortion } from "./LiquidDistortion";
import { API_URL } from "@/config/api";

const WorkSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          // Show up to 10 projects, prioritizing featured if you want, but simply taking the most recent (backend sorts by date)
          // to ensure all uploaded works appear as requested.
          setProjects(data.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

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
              key={project._id || index}
              title={project.title}
              category={project.industry || project.tags?.[0] || "Web Design"}
              image={project.imageUrl}
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