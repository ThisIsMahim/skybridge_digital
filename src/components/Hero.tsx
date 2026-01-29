import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LiquidDistortion } from "./LiquidDistortion";
import Hero3DScene from "./Hero3DScene";
import { BookingModal } from "./BookingModal";
import { Magnetic } from "./Magnetic";
import { Sparkles } from "./Sparkles";

const Hero = () => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center bg-background">
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3D Scene - Centered/Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hero3DScene />
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-20 pt-32 pb-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Description & CTA */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 lg:space-y-8 opacity-0 animate-fade-in [animation-delay:0.2s] w-full ">
            {/* Tagline / Badge */}
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 p-1 pr-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-semibold text-emerald-400">3 slots</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Available for {new Date().toLocaleString('default', { month: 'long' })}
              </span>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg">
              We are a <span className="text-foreground font-semibold">web development</span> and <span className="text-foreground font-semibold">digital marketing</span> agency.
              We build immersive digital experiences that command attention and drive real growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start  pt-2 w-full">
              <BookingModal>
                <Magnetic>
                  <div
                    className="relative inline-block"
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                  >
                    <Button
                      size="lg"
                      className="relative z-10 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-full transition-all duration-300 shadow-[0_0_20px_-5px_hsla(0,0%,100%,0.3)] hover:shadow-[0_0_30px_-5px_hsl(var(--accent))]"
                    >
                      Book a Call
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                    </Button>
                    <Sparkles isActive={isBtnHovered} />
                  </div>
                </Magnetic>
              </BookingModal>

              <LiquidDistortion>
                <Link
                  to="/work"
                  className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Our Work
                </Link>
              </LiquidDistortion>
            </div>
          </div>

          {/* Right Column: Headline */}
          <div className="lg:col-span-7 order-1 lg:order-2 opacity-0 animate-fade-in w-full">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] xl:text-[6.5vw] font-black leading-[0.95] lg:leading-[0.9] tracking-tighter text-foreground uppercase text-center lg:text-left w-full">
              Bridging
              <br />
              <span className="text-gradient">Brand &</span>
              <br />
              Reality
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center justify-center opacity-0 animate-fade-in [animation-delay:1.5s]">
        <div className="w-[30px] h-[50px] border border-white/20 rounded-full flex justify-center p-2 backdrop-blur-sm bg-white/5 shadow-[0_0_20px_-5px_hsla(0,0%,100%,0.1)]">
          <div className="w-1 h-2 bg-accent rounded-full animate-scroll-down shadow-[0_0_10px_hsl(var(--accent))]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
