import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WorkSection from "@/components/WorkSection";
import ContactFooter from "@/components/ContactFooter";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <ContactFooter />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
