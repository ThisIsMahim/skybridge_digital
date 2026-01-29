
import Navbar from "@/components/Navbar";
// import FooterTunnel from "@/components/FooterTunnel";
import ProjectCard from "@/components/ProjectCard";

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
    // Duplicating for demo purposes to fill the page
    {
        title: "Echo Systems",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    },
    {
        title: "Stellar Architecture",
        category: "Brand Identity",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    },
];

const Work = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full px-6 lg:px-12 xl:px-20">

                    {/* Header */}
                    <div className="mb-20   space-y-6">
                        <span className="text-accent text-sm font-medium tracking-widest uppercase block animate-fade-in">
                            Our Portfolio
                        </span>
                        <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase animate-fade-in [animation-delay:0.1s]">
                            WOrks we did
                        </h1>
                    </div>

                    {/* Project Grid */}
                    <div className="grid md:grid-cols-2 gap-1 animate-fade-in [animation-delay:0.2s]">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={`${project.title}-${index}`}
                                title={project.title}
                                category={project.category}
                                image={project.image}
                                className="w-full"
                            />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Work;
