import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";
import { cn } from "../lib/utils";

const testimonialsRaw = [
    {
        quote:
            "Skybridge Digital completely transformed our online presence. Their strategic approach and stunning design helped us increase conversions by 200%.",
        author: "Sarah Jenkins",
        role: "CMO, Nexus Finance",
        company: "Nexus Finance",
    },
    {
        quote:
            "The team at Skybridge is simply world-class. They didn't just build a website; they built a digital ecosystem that powers our entire business.",
        author: "Michael Chen",
        role: "Founder, Verdant Health",
        company: "Verdant Health",
    },
    {
        quote:
            "We needed a partner who could understand our complex technology and present it simply. Skybridge delivered beyond our expectations.",
        author: "Elena Rodriguez",
        role: "VP of Product, Quantum Labs",
        company: "Quantum Labs",
    },
];

// Duplicate data to ensure smooth infinite looping with enough items
const testimonials = [...testimonialsRaw, ...testimonialsRaw];

const TestimonialsSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Handle Autoplay
    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            }
        }, 4000);

        // Optional: Stop autoplay on interaction could be added here

        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-20 space-y-6 text-center">
                    <span className="text-accent text-sm font-medium tracking-widest uppercase">
                        Testimonials
                    </span>
                    <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                        Client Stories
                    </h2>
                </div>

                <div className="relative max-w-[1400px] mx-auto">
                    {/* Carousel Viewport */}
                    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y">
                            {testimonials.map((item, index) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <div
                                        key={index}
                                        className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_35%] min-w-0 pl-4"
                                    >
                                        <div
                                            className={cn(
                                                "h-full p-8 md:p-12 rounded-2xl border transition-all duration-500 ease-out",
                                                "bg-background flex flex-col justify-between",
                                                isActive
                                                    ? "opacity-100 scale-100 blur-0 border-border shadow-2xl z-10"
                                                    : "opacity-40 scale-95 blur-[2px] border-transparent shadow-none z-0"
                                            )}
                                        >
                                            <div>
                                                <Quote className={cn(
                                                    "w-12 h-12 mb-8 transition-colors duration-500",
                                                    isActive ? "text-accent" : "text-muted-foreground/30"
                                                )} />
                                                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                                                    "{item.quote}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 border-t border-border/50 pt-6 mt-auto">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-500",
                                                    isActive ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                                                )}>
                                                    {item.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-foreground font-display text-lg">
                                                        {item.author}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
