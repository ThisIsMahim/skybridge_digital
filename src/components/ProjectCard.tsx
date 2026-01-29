
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const ProjectCard = ({
    title,
    category,
    image,
    className,
    onMouseEnter,
    onMouseLeave
}: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery("(max-width: 1024px)");

    return (
        <div
            ref={cardRef}
            className={cn(
                "group relative w-full aspect-[4/3] overflow-hidden bg-black/5",
                !isMobile && "cursor-none",
                className
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* --- Base Layer (Always Visible) --- */}
            {/* Darkened/Grayscale version */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* --- Reveal Layer (Fade Effect) --- */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                {/* Full color image */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* --- Text Content --- */}
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-20 pointer-events-none mix-blend-difference">
                <span className="text-white/80 text-xs uppercase tracking-widest mb-3 font-medium">
                    {category}
                </span>
                <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                    {title}
                </h3>
                <button className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white pointer-events-auto lg:hidden group/btn">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
