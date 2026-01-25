import { useEffect, useRef, useState } from "react";
import { Compass, Target, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Load images using Vite's glob import
const frameModules = import.meta.glob('../assets/handshake-sequence/*.jpg', { eager: true, import: 'default' });
const frameUrls = Object.keys(frameModules).sort().map(path => frameModules[path] as string);

const processSteps = [
  {
    icon: Compass,
    title: "Discovery",
    description: "We dive deep into your brand, audience, and objectives. Understanding the challenge is the first step to solving it.",
  },
  {
    icon: Target,
    title: "Strategy",
    description: "Data-driven roadmaps and creative concepts that align with your business goals and resonate with your audience.",
  },
  {
    icon: Wrench,
    title: "Execution",
    description: "Agile sprints, transparent communication, and iterative refinement. We build with precision and purpose.",
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = frameUrls.length;
    const imageObjects: HTMLImageElement[] = [];

    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      imageObjects.push(img);
    });
    imagesRef.current = imageObjects;
  }, []);

  // Draw frame
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (canvas && ctx && img) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect ratio to cover (object-fit: cover equivalent)
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      // Add a slight zoom (1.3x) to crop out baked-in letterboxing (black bars)
      const ratio = Math.max(hRatio, vRatio) * 1.3;

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame if needed
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // GSAP ScrollTrigger
  useEffect(() => {
    if (!imagesLoaded || !sectionRef.current || !canvasRef.current) return;

    const frames = { current: 0 };
    const totalFrames = frameUrls.length - 1;

    // Initial draw
    renderFrame(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        renderFrame(Math.round(frames.current));
      }
    });

    tl.to(frames, {
      current: totalFrames,
      snap: "current",
      ease: "none",
      duration: 1
    });

    // Animate Progress Bar
    if (progressBarRef.current) {
      gsap.fromTo(progressBarRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          }
        }
      );
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [imagesLoaded]);

  return (
    <section ref={sectionRef} id="process" className="relative w-full">
      {/* Background Sticky Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen -z-10 overflow-hidden bg-background">
        {/* Reduced overlay opacity to make canvas visible */}
        <div className="absolute inset-0 bg-background/40 z-10" />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-0">
            Loading...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Foreground Content */}
      <div className="w-full px-6 lg:px-12 xl:px-20 relative z-20 -mt-[100vh]">
        <div className="grid lg:grid-cols-[1.5fr_auto_1fr] gap-x-8 lg:gap-x-20 min-h-screen pt-32 lg:pt-48 pb-32">

          {/* Scrolling Left Column - Steps */}
          <div className="space-y-32 lg:space-y-64 order-2 lg:order-1 py-16">
            {processSteps.map((step, index) => (
              <div key={step.title} className="group relative pl-8 lg:pl-0 border-l lg:border-l-0 border-border/30">
                <div className="space-y-6 lg:text-right">
                  <span className="font-display text-7xl lg:text-8xl font-extrabold text-foreground/10 group-hover:text-accent/30 transition-colors block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-lg lg:ml-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Column - Scroll Linked Progress Bar */}
          <div className="hidden lg:flex flex-col items-center justify-start sticky top-32 h-[calc(100vh-8rem)] order-2">
            {/* Track */}
            <div className="w-px h-full bg-border/20 relative overflow-hidden">
              {/* Fill */}
              <div ref={progressBarRef} className="absolute top-0 left-0 w-full bg-accent origin-top" style={{ height: '0%' }} />
            </div>
          </div>

          {/* Sticky Right Column - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-8 h-fit order-1 lg:order-3 pt-16">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Process
            </span>
            <h2 className="font-display text-5xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
              How We
              <br />
              Work
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Our proven methodology ensures we deliver exceptional results, every time.
            </p>

            {/* Mobile Header logic */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;