
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WorkGridCard from "@/components/WorkGridCard";
import { caseStudies } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";

const Work = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("category") || "All Work";
    const categories = ["All Work", "Web Design", "SEO", "Marketing", "Branding"];

    const setFilter = (newFilter: string) => {
        if (newFilter === "All Work") {
            searchParams.delete("category");
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: newFilter });
        }
    };

    const filteredProjects = filter === "All Work"
        ? caseStudies
        : caseStudies.filter(p => p.industry === filter);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="w-full px-6 lg:px-12 xl:px-20 container mx-auto">

                    {/* 1. Header & Navigation */}
                    <div className="mb-16 lg:mb-24 text-center max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="block text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4"
                        >
                            Our Portfolio
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
                        >
                            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Digital Excellence.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                        >
                            Explore our gallery of success stories. From high-conversion websites to dominant SEO strategies, we help businesses across industries achieve measurable growth.
                        </motion.p>
                    </div>

                    {/* 2. Strategic Filtering (The UX Part) */}
                    <div className="mb-12 flex flex-wrap justify-center gap-2 lg:gap-4">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                                    relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                                    ${filter === cat
                                        ? "text-background bg-foreground"
                                        : "text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary"
                                    }
                                `}
                            >
                                {cat}
                                {filter === cat && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 rounded-full border-2 border-primary"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 3. Project Gallery (Grid Layout) */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <WorkGridCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State if needed */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No projects found for this category.</p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Work;
