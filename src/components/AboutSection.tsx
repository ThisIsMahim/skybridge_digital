import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: "2018",
    title: "Foundation",
    description: "Skybridge Systems was born from a vision to unite strategy, design, and technology under one roof.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description: "Our methodology now powers brands in 15+ countries, bridging gaps across markets.",
  },
  {
    year: "2025",
    title: "The Future",
    description: "Building the next generation of digital experiences with AI-driven innovation.",
  },
];

const AboutSection = () => {
  const [activeYear, setActiveYear] = useState<string>(timelineItems[0].year);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center+=10%",
          end: "bottom center-=10%",
          onEnter: () => setActiveYear(timelineItems[index].year),
          onEnterBack: () => setActiveYear(timelineItems[index].year),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="min-h-screen py-24 bg-transparent">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32">
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-8">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              The Bridge
            </span>
            <h2 className="font-display text-5xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
              Who
              <br />
              We Are
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              We are architects of digital transformation, building bridges between
              where brands are and where they need to be.
            </p>
          </div>

          {/* Scrolling Timeline */}
          <div className="relative" ref={containerRef}>
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-16">
              {timelineItems.map((item, index) => (
                <div
                  key={item.year}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`relative pl-12 group transition-all duration-500 ease-out py-8 ${activeYear === item.year
                    ? "opacity-100 blur-none scale-100"
                    : "opacity-30 blur-[2px] scale-95"
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-8 -translate-x-1/2 w-3 h-3 rounded-full transition-colors duration-500 ${activeYear === item.year
                      ? "bg-accent scale-125"
                      : "bg-foreground group-hover:bg-accent"
                      }`}
                  />

                  {/* Content - floating text, no card */}
                  <div className="space-y-4">
                    <span
                      className={`font-display font-extrabold text-6xl lg:text-7xl transition-opacity duration-500 ${activeYear === item.year
                        ? "text-accent opacity-100"
                        : "text-accent opacity-20 group-hover:opacity-40"
                        }`}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-foreground uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;