import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WorkGridCard from "@/components/WorkGridCard";
import { caseStudies } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as any
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 }
    }
};

const CaseStudies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("category") || "All Work";
    const categories = ["All Work", "Web Design", "SEO", "Marketing", "Branding"];

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const setFilter = (newFilter: string) => {
        if (newFilter === "All Work") {
            searchParams.delete("category");
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: newFilter });
        }
    };

    const filteredProjects = useMemo(() => {
        return filter === "All Work"
            ? caseStudies
            : caseStudies.filter(p => p.industry === filter);
    }, [filter]);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
            <Navbar />

            <main className="pt-32 pb-20 overflow-hidden">
                <div className="w-full px-6 lg:px-12 xl:px-20 container mx-auto">

                    {/* 1. Header & Navigation */}
                    <header className="mb-16 lg:mb-24 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="block text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-80">
                                Our Portfolio
                            </span>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                                Crafting <br className="md:hidden" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Digital </span>
                                <span className="text-accent">Excellence.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                                Explore our gallery of success stories. We help businesses across industries achieve measurable, exponential growth.
                            </p>
                        </motion.div>
                    </header>

                    {/* 2. Strategic Filtering */}
                    <nav className="mb-16 flex flex-wrap justify-center gap-3 lg:gap-4 sticky top-24 z-30 py-4 pointer-events-none">
                        <div className="flex flex-wrap justify-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full pointer-events-auto shadow-2xl">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`
                                        relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500
                                        ${filter === cat
                                            ? "text-black"
                                            : "text-white/60 hover:text-white"
                                        }
                                    `}
                                >
                                    <span className="relative z-10">{cat}</span>
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="activeFilterBg"
                                            className="absolute inset-0 bg-white rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* 3. Project Gallery */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24 mb-32"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout="position"
                                    key={project.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="will-change-transform"
                                >
                                    <WorkGridCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-40 mb-20"
                        >
                            <p className="text-muted-foreground font-display text-2xl">No projects found for this category.</p>
                            <button
                                onClick={() => setFilter("All Work")}
                                className="mt-8 text-accent font-bold uppercase tracking-widest text-sm hover:underline"
                            >
                                View All Projects
                            </button>
                        </motion.div>
                    )}

                    {/* 4. Final CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden bg-white text-black py-24 px-8 text-center mb-12 shadow-[0_40px_100px_-20px_rgba(255,255,255,0.1)]"
                    >
                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <h2 className="font-display text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                                Ready to be our <br /> next success story?
                            </h2>
                            <p className="text-xl font-medium opacity-70">
                                Let's discuss how we can help your business achieve similar results.
                            </p>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-10 py-5 bg-black text-white font-black rounded-full text-sm uppercase tracking-[0.2em] hover:shadow-2xl transition-all duration-300"
                            >
                                Let's Talk
                            </motion.a>
                        </div>
                        {/* Subtle patterns */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`, backgroundSize: '32px 32px' }}
                        />
                    </motion.section>

                </div>
            </main>
        </div>
    );
};

export default CaseStudies;



