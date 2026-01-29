import { useEffect, useRef } from "react";
import gsap from "gsap";

const clients = [
    "Nexus Finance",
    "Verdant Health",
    "Quantum Labs",
    "Atlas Ventures",
    "Aurora Systems",
    "Blue Horizon",
    "Cyber Peak",
    "Delta Dynamics",
    "Echo Valley",
    "Future Net",
];

const ClientLogos = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const inner = scroller.querySelector(".scroller-inner");
        if (!inner) return;

        // Clone items for seamless scroll
        const innerContent = Array.from(inner.children);
        innerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            (duplicatedItem as HTMLElement).setAttribute("aria-hidden", "true");
            inner.appendChild(duplicatedItem);
        });

        gsap.to(inner, {
            x: "-50%",
            ease: "none",
            duration: 20,
            repeat: -1,
        });
    }, []);

    return (
        <section className="py-12 border-y border-border/50 overflow-hidden bg-background">
            <div className="container px-4 md:px-6 mb-8 text-center">
                <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    Trusted by innovative companies worldwide
                </p>
            </div>
            <div ref={scrollerRef} className="scroller w-full max-w-[100vw] overflow-hidden mask-linear-fade">
                {/* mask-linear-fade can be a custom class or inline style if not present. 
             I'll use a style for safety or a widely supported tailwind utility method if available, 
             but standard CSS mask is safer. */}
                <div
                    className="scroller-inner flex w-max gap-12 sm:gap-24 items-center whitespace-nowrap"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}
                >
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        >
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                                {client}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;
