const timelineItems = [
  {
    year: "2018",
    title: "Foundation",
    description: "Skybridge Digital was born from a vision to unite strategy, design, and technology under one roof.",
  },
  {
    year: "2019",
    title: "Growth & Expansion",
    description: "We expanded our team and capabilities, taking on enterprise clients across multiple industries.",
  },
  {
    year: "2021",
    title: "Innovation Lab",
    description: "Launched our R&D initiative, pioneering new approaches to digital transformation.",
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
  return (
    <section id="about" className="min-h-screen py-32 lg:py-48">
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
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-16">
              {timelineItems.map((item, index) => (
                <div
                  key={item.year}
                  className="relative pl-12 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground group-hover:bg-accent transition-colors" />

                  {/* Content - floating text, no card */}
                  <div className="space-y-4">
                    <span className="text-accent font-display font-extrabold text-6xl lg:text-7xl opacity-20 group-hover:opacity-40 transition-opacity">
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