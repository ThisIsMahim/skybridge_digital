import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WorkGridCard from "@/components/WorkGridCard";
import { caseStudies } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";

const CaseStudies = () => {
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

                    {/* 1. Header & Navigation (From Work.tsx) */}
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
                            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Digital Excellence.</span>
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

                    {/* 2. Strategic Filtering (From Work.tsx) */}
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

                    {/* 3. Project Gallery (Grid Layout using WorkGridCard) */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16 mb-24"
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
                        <div className="text-center py-20 mb-20">
                            <p className="text-muted-foreground">No projects found for this category.</p>
                        </div>
                    )}

                    {/* 4. Final CTA (From original CaseStudies.tsx) */}
                    <section className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground py-20 px-8 text-center mb-12">
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="font-display text-4xl lg:text-5xl font-bold">
                                Ready to be our next success story?
                            </h2>
                            <p className="text-xl opacity-90">
                                Let's discuss how we can help your business achieve similar results.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-8 py-4 bg-background text-foreground font-bold rounded-full text-lg hover:bg-background/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                            >
                                Let's Talk
                            </a>
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shimmer pointer-events-none" />
                    </section>

                </div>
            </main>
        </div>
    );
};

export default CaseStudies;
