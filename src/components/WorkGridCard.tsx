
import { Link } from "react-router-dom";
import { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface WorkGridCardProps {
    project: CaseStudy;
    className?: string;
}

const WorkGridCard = ({ project, className }: WorkGridCardProps) => {
    return (
        <Link
            to={`/case-studies/${project.id}`}
            className={cn("group block w-full", className)}
        >
            {/* Thumbnail with Hover Effect */}
            <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden mb-6">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-secondary text-xs uppercase tracking-widest font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Result
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl text-white font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {project.metric}
                        {/* Using metric as the "Result" e.g. "10x Growth" */}
                    </h3>
                    <div className="mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <span className="flex items-center gap-2 text-white/80 text-sm font-medium border border-white/30 px-4 py-2 rounded-full">
                            View Case Study <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Below Image */}
            <div className="flex items-start gap-4">
                {/* Client Logo */}
                <div className="w-12 h-12 flex-shrink-0 bg-white border border-border rounded-full p-2 flex items-center justify-center shadow-sm">
                    {/* Using a placeholder if logo fails or is purely decoration in this mock */}
                    {project.logo ? (
                        <img src={project.logo} alt={project.client} className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-xs font-bold text-black">{project.client.substring(0, 2)}</span>
                    )}
                </div>

                {/* Text Info */}
                <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.summary}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default WorkGridCard;
