import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
    data: CaseStudy;
    className?: string;
}

const CaseStudyCard = ({ data, className }: CaseStudyCardProps) => {
    return (
        <div
            className={cn(
                "group relative flex flex-col bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
                className
            )}
        >
            {/* Image Header - Optional, adding for visual punch if design permits, otherwise simple text card. 
          The user asked for Grid Layout with specific text. 
          I will include a small image thumbnail or header to make it pop.
      */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                <img
                    src={data.image}
                    alt={data.client}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-background bg-foreground rounded-full uppercase">
                        {data.industry}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-6 sm:p-8">
                {/* Client & Title */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-widest">
                        {data.client}
                    </h4>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {data.title}
                    </h3>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-8 flex-grow">
                    <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">The Challenge</span>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {data.challenge}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">The Solution</span>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {data.solution}
                        </p>
                    </div>
                </div>

                {/* Key Metric & CTA */}
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-border/50">
                    <div>
                        <span className="block text-xs font-medium text-muted-foreground mb-1">Key Impact</span>
                        <div className="flex items-center gap-2 text-primary font-bold text-2xl sm:text-3xl font-display">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                            {data.metric}
                        </div>
                    </div>

                    <Link
                        to={`/case-studies/${data.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group/btn"
                    >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyCard;
