import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Full-width content - no container */}
      <div className="w-full px-6 lg:px-12 xl:px-20 py-32 relative z-10">
        <div className="space-y-8 opacity-0 animate-fade-in">
          {/* Massive headline - viewport-based sizing */}
          <h1 className="font-display text-[12vw] sm:text-[10vw] lg:text-[9vw] font-extrabold leading-[0.85] tracking-tighter text-foreground uppercase">
            Bridging
            <br />
            <span className="text-gradient">Brand & Digital</span>
            <br />
            Reality
          </h1>

          {/* Minimal subtext */}
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl leading-relaxed mt-12">
            We craft premium digital experiences that transform how brands connect
            with their audience.
          </p>

          {/* CTA - minimal */}
          <div className="flex gap-6 mt-12 items-center">
            <Button
              size="lg"
              className="group h-14 px-8 text-base bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none"
            >
              Start Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <a
              href="#work"
              className="text-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest"
            >
              View Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - bottom left */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-4 opacity-0 animate-fade-in [animation-delay:1s]">
        <div className="w-px h-16 bg-foreground/30" />
        <span className="text-xs text-muted-foreground uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
      </div>

      {/* Year marker - bottom right */}
      <div className="absolute bottom-12 right-6 lg:right-12 text-muted-foreground text-sm opacity-0 animate-fade-in [animation-delay:1s]">
        © 2025
      </div>
    </section>
  );
};

export default Hero;