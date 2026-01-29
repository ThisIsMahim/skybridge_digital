
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "framer-motion";

const CaseStudies = () => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", "SEO", "Web Design", "Marketing", "Branding"];

    const filteredStudies = filter === "All"
        ? caseStudies
        : caseStudies.filter(study => study.industry === filter);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-20">
                <div className="container mx-auto px-6 lg:px-12 xl:px-20">

                    {/* 1. Hero Section */}
                    <section className="mb-20 space-y-6 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-display text-5xl lg:text-7xl font-extrabold tracking-tight"
                        >
                            Real Results for <br className="hidden lg:block" />
                            <span className="text-primary">Real Businesses</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg lg:text-2xl text-muted-foreground max-w-2xl lg:mx-0 mx-auto"
                        >
                            An overview of how we solve our clients' problems and drive measurable growth.
                        </motion.p>
                    </section>

                    {/* 2. Filter Section */}
                    <section className="mb-12">
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border-2 
                                        ${filter === category
                                            ? "bg-primary border-primary text-background"
                                            : "bg-transparent border-muted text-muted-foreground hover:border-foreground hover:text-foreground"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 3. Case Study Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ml-auto gap-8 mb-20">
                        {filteredStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <CaseStudyCard data={study} className="h-full" />
                            </motion.div>
                        ))}
                    </section>

                    {/* 5. Final CTA */}
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
                        {/* Decorative background elements can accept SVG or CSS shapes here */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shimmer pointer-events-none" />
                    </section>

                </div>
            </main>
        </div>
    );
};

export default CaseStudies;
