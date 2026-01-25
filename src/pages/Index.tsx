import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WorkSection from "@/components/WorkSection";
import ContactFooter from "@/components/ContactFooter";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const services = servicesRef.current;
    const process = processRef.current;

    if (!services || !process) return;

    const ctx = gsap.context(() => {
      // Blur Services section when Process section enters
      gsap.to(services, {
        scrollTrigger: {
          trigger: process,
          start: "top bottom", // When top of process enters viewport
          end: "top center",   // Adjust intersection point
          scrub: true,
        },
        filter: "blur(8px)",
        opacity: 0.5,
        scale: 0.95,
        ease: "none",
      });

      // Acceleration/Parallax effect for Process section
      gsap.from(process, {
        scrollTrigger: {
          trigger: process,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
        y: 150, // Start lower to create "acceleration" check
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <div ref={servicesRef} className="relative z-0" id="services-container">
        <ServicesSection />
      </div>
      <div ref={processRef} className="relative z-10 shadow-2xl" id="process-container">
        <ProcessSection />
      </div>
      <div className="relative z-0 shadow-2xl">
        <WorkSection />
      </div>
      <ContactFooter />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
