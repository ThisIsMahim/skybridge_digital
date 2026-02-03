
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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

    return (
        <Link
            to="/case-studies"
            ref={cardRef as any}
            className={cn(
                "group relative w-full aspect-[3/2] overflow-hidden bg-black/5 block cursor-pointer",
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
                    loading="lazy"
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
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>


            {/* --- Text Content --- */}
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end z-20 pointer-events-none mix-blend-difference">
                <span className="text-white/80 text-[10px] uppercase tracking-widest mb-2 font-medium">
                    {category}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-tight leading-none">
                    {title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    View Case Study
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
