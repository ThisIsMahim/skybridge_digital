import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ServiceTheme {
  bg: string;
  text: string;
  accent: string;
  border: string;
  secondaryText: string;
}

interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  theme: ServiceTheme;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
}

const services: Service[] = [
  {
    id: "01",
    category: "Design",
    title: "UI/UX & Brand Identity",
    description: "Crafting immersive digital experiences that captivate. We build pixel-perfect interfaces and robust design systems effectively bridging imagination and interaction.",
    theme: {
      bg: "bg-zinc-50",
      text: "text-zinc-950",
      accent: "text-indigo-600",
      border: "border-zinc-200",
      secondaryText: "text-zinc-600"
    }
  },
  {
    id: "02",
    category: "Development",
    title: "Web & Mobile Engineering",
    description: "Scalable, high-performance solutions built on modern architectures. We compile complex requirements into elegant, secure code ready for growth.",
    theme: {
      bg: "bg-black",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-white/10",
      secondaryText: "text-zinc-400"
    }
  },
  {
    id: "03",
    category: "SEO & Stats",
    title: "Search Engine Optimization",
    description: "Data-driven strategies to dominate rankings. We analyze and optimize to ensure your brand reaches the right audience.",
    theme: {
      bg: "bg-[#1a4048]",
      text: "text-white",
      accent: "text-cyan-200",
      border: "border-white/10",
      secondaryText: "text-white/80"
    }
  },
  {
    id: "04",
    category: "Marketing",
    title: "Digital Growth Strategy",
    description: "Strategic campaigns that drive real results. We blend creativity with analytics to amplify your message and connect with customers.",
    theme: {
      bg: "bg-[#0a2233]",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-white/10",
      secondaryText: "text-slate-400"
    }
  }
];

const ServiceCard = ({ service, index, range, targetScale, progress }: ServiceCardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  // Disable scale effect on mobile for simpler list view
  const scale = useTransform(progress, range, [1, targetScale]);
  const finalScale = isMobile ? 1 : scale;

  return (
    <div ref={container} className={`min-h-screen lg:h-screen flex items-center justify-center relative lg:sticky lg:top-0 ${service.theme.bg}`}>
      <motion.div
        style={{ scale: finalScale, top: isMobile ? 0 : `calc(-5vh + ${index * 25}px)` }}
        className={`relative flex flex-col md:flex-row gap-6 lg:gap-10 w-full max-w-7xl mx-auto p-6 lg:p-10 h-auto lg:h-[70vh] rounded-[2rem] border ${service.theme.border} overflow-hidden ${service.theme.bg} will-change-transform`}
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-between z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className={`text-4xl font-display font-bold opacity-30 ${service.theme.text}`}>{service.id}</span>
              <span className={`text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full border ${service.theme.border} ${service.theme.text}`}>
                {service.category}
              </span>
            </div>

            <h3 className={`font-display text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tighter uppercase ${service.theme.text}`}>
              {service.title.split(' ').map((word: string, i: number) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
          </div>

          <div className="space-y-6">
            <p className={`text-lg leading-relaxed max-w-md ${service.theme.secondaryText}`}>
              {service.description}
            </p>

            <button className={`group flex items-center gap-3 text-base font-medium transition-colors ${service.theme.accent}`}>
              <span>Explore Solution</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full md:w-1/2 relative h-full rounded-2xl overflow-hidden bg-zinc-900/5 dark:bg-white/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full bg-zinc-300 dark:bg-zinc-800 object-cover"
            >
              {/* Fallback pattern or placeholder */}
              <div className={`w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.1),transparent_70%)]`} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const container = useRef(null);

  // Integrate Lenis scroll for smooth handling
  useLenis(({ scroll }) => {
    // Optional: Use scroll value here if needed for custom logic
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative bg-black">
      {/* Header - Stays put until scrolled past or could be part of the flow */}
      <div className="h-[50vh] flex flex-col items-center justify-center sticky top-0 z-0 pointer-events-none">
        <span className="text-cyan-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
          Capabilities
        </span>
        <h2 className="font-display text-7xl lg:text-[10vw] font-black text-white leading-none tracking-tighter text-center mix-blend-difference">
          WHAT WE DO
        </h2>
      </div>

      <div className="relative z-10 w-full">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.05);
          return (
            <ServiceCard
              key={i}
              index={i}
              service={service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Buffer removed to fix gap */}
    </section>
  );
};

export default ServicesSection;
