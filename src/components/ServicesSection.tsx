import { Code2, Search, Megaphone } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Full-stack development with cutting-edge technologies. From responsive websites to complex web applications, we build digital experiences that scale.",
    tags: ["React", "Node.js", "Cloud Infrastructure"],
  },
  {
    icon: Search,
    title: "SEO & Analytics",
    description: "Data-driven optimization strategies that put your brand in front of the right audience. We don't just rank—we convert.",
    tags: ["Technical SEO", "Content Strategy", "Performance"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Integrated campaigns that amplify your message across channels. Strategy, execution, and measurable results.",
    tags: ["Paid Media", "Social", "Growth Marketing"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="min-h-screen py-24 relative">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 space-y-6">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Services
          </span>
          <h2 className="font-display text-5xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
            What
            <br />
            We Do
          </h2>
        </div>

        {/* Service List - Minimal, text-focused */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group border-t border-border py-12 lg:py-16"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="grid lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-16 items-start">
                {/* Number */}
                <span className="font-display text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground group-hover:text-accent transition-colors uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap lg:flex-col gap-3 lg:items-end">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;