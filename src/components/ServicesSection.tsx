import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  image: string;
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
    description: "Crafting immersive digital experiences that captivate. We build pixel-perfect interfaces and robust design systems.",
    theme: {
      bg: "bg-zinc-50",
      text: "text-zinc-950",
      accent: "text-indigo-600",
      border: "border-zinc-200",
      secondaryText: "text-zinc-600"
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
  },
  {
    id: "02",
    category: "Development",
    title: "Web & Mobile Engineering",
    description: "Scalable, high-performance solutions built on modern architectures. We compile complex requirements into elegant code.",
    theme: {
      bg: "bg-black",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-white/10",
      secondaryText: "text-zinc-400"
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
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
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: "04",
    category: "Marketing",
    title: "Digital Growth Strategy",
    description: "Strategic campaigns that drive real results. We blend creativity with analytics to amplify your message.",
    theme: {
      bg: "bg-[#0a2233]",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-white/10",
      secondaryText: "text-slate-400"
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
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
    <div ref={container} className={`min-h-[80vh] lg:h-screen flex items-center justify-center relative lg:sticky lg:top-0 ${service.theme.bg}`}>
      <motion.div
        style={{ scale: finalScale, top: isMobile ? 0 : `calc(-5vh + ${index * 25}px)` }}
        className={`relative flex flex-col md:flex-row gap-4 lg:gap-8 w-full max-w-6xl mx-auto p-4 lg:p-8 h-auto lg:h-[60vh] rounded-[2rem] border ${service.theme.border} overflow-hidden ${service.theme.bg} will-change-transform`}
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-display font-bold opacity-30 ${service.theme.text}`}>{service.id}</span>
              <span className={`text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border ${service.theme.border} ${service.theme.text}`}>
                {service.category}
              </span>
            </div>

            <h3 className={`font-display text-3xl lg:text-5xl font-bold leading-[0.9] tracking-tighter uppercase ${service.theme.text}`}>
              {service.title.split(' ').map((word: string, i: number) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
          </div>

          <div className="mt-4">
            <p className={`text-sm lg:text-base leading-relaxed max-w-sm ${service.theme.secondaryText}`}>
              {service.description}
            </p>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-0 md:h-full rounded-2xl overflow-hidden bg-zinc-900/5 dark:bg-white/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full bg-zinc-300 dark:bg-zinc-800"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
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
