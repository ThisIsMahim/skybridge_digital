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

import FloatingChatButton from "@/components/FloatingChatButton";
import ClientLogos from "@/components/ClientLogos";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterTunnel from "@/components/FooterTunnel";

import InitialLoadReveal from "@/components/InitialLoadReveal";

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const services = servicesRef.current;
    const process = processRef.current;

    if (!services || !process) return;

    // GSAP animations removed for seamless scrolling optimization
    // The CSS sticking and z-index layering provides the best performance
  }, []);




  return (
    <div className="min-h-screen">
      <InitialLoadReveal />
      <Navbar />
      <Hero />
      <ClientLogos />
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
      <TestimonialsSection />
      <FooterTunnel />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
