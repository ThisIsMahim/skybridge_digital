const projects = [
  {
    title: "Nexus Finance",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    title: "Verdant Health",
    category: "Brand & Digital",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    title: "Quantum Labs",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
  },
  {
    title: "Atlas Ventures",
    category: "Marketing Campaign",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="min-h-screen py-24">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-24 lg:mb-32 space-y-6">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-5xl lg:text-6xl xl:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
            Selected
            <br />
            Work
          </h2>
        </div>

        {/* Project Grid - Full width, minimal */}
        <div className="grid md:grid-cols-2 gap-1">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <span className="text-accent text-xs uppercase tracking-widest mb-3">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl lg:text-4xl font-extrabold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 lg:mt-24">
          <a
            href="#"
            className="inline-flex items-center gap-4 text-foreground hover:text-accent transition-colors group"
          >
            <span className="text-sm uppercase tracking-widest">View all projects</span>
            <svg
              className="w-6 h-6 transition-transform group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;