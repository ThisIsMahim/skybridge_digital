import { Compass, Target, Wrench, Rocket } from "lucide-react";

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
    title: "Development",
    description: "Agile sprints, transparent communication, and iterative refinement. We build with precision and purpose.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deployment is just the beginning. We ensure a smooth launch and provide ongoing support for continuous growth.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="min-h-screen py-32 lg:py-48 relative">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 space-y-6">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Process
          </span>
          <h2 className="font-display text-5xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
            How We
            <br />
            Work
          </h2>
        </div>

        {/* Process Steps - Horizontal on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="group space-y-6"
            >
              {/* Number */}
              <div className="flex items-center gap-6">
                <span className="font-display text-7xl lg:text-8xl font-extrabold text-foreground/10 group-hover:text-accent/30 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-extrabold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;