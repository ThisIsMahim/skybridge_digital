import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { API_URL } from "@/config/api";
import { ArrowLeft, Quote, CheckCircle2, ExternalLink, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CaseStudyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [study, setStudy] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudy = async () => {
            if (!id) return;
            try {
                const res = await fetch(`${API_URL}/projects/${id}`);
                if (res.ok) {
                    const p = await res.json();
                    const mapped = {
                        ...p,
                        id: p._id,
                        image: p.imageUrl,
                        industry: p.industry || p.tags?.[0] || "Web Design",
                        client: p.client || "Client",
                        metric: p.metric || "Result",
                        logo: p.logo || "",
                        summary: p.summary || p.description || "",
                        testimonial: p.testimonial || { quote: "Project delivered successfully.", author: "Client", role: "CEO" },
                        challenge: p.challenge || "The challenge details are currently being updated.",
                        solution: p.solution || "The solution details are currently being updated.",
                        challengeImage: p.challengeImage || p.imageUrl,
                        solutionImage: p.solutionImage || p.imageUrl,
                        overview: p.overview || p.description || "Project overview pending.",
                        problemDetail: p.problemDetail || "Problem context pending.",
                        approach: p.approach || "Strategic approach pending.",
                        outcome: p.outcome || "Final outcome pending.",
                        liveLink: p.liveLink,
                        repoLink: p.repoLink,
                        tags: p.tags || []
                    };
                    setStudy(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch study", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudy();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen grid place-items-center bg-black text-white">Loading...</div>;
    }

    if (!study) {
        return <Navigate to="/case-studies" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-20">
                {/* Back Button */}
                <div className="container mx-auto px-6 lg:px-12 xl:px-20 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium appearance-none bg-transparent border-0 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Work
                    </button>
                </div>

                {/* Hero / Header */}
                <header className="container mx-auto px-6 lg:px-12 xl:px-20 mb-16 lg:mb-24">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_-3px_hsl(var(--accent)/0.3)]">
                                {study.industry}
                            </span>
                            <span className="text-muted-foreground font-medium">|</span>
                            <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                                {study.client}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]"
                        >
                            {study.title}
                        </motion.h1>

                        {/* Stats / Metrics Bar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex flex-col sm:flex-row gap-8 bg-secondary/30 backdrop-blur-sm border border-white/10 p-6 rounded-2xl"
                        >
                            <div>
                                <span className="block text-xs text-accent font-bold uppercase tracking-widest mb-1">Key Outcome</span>
                                <span className="block text-3xl font-bold text-white">{study.metric}</span>
                            </div>
                            <div className="hidden sm:block w-px bg-white/10" />
                            <div>
                                <span className="block text-xs text-accent font-bold uppercase tracking-widest mb-1">Service</span>
                                <span className="block text-xl font-semibold text-white/90">{study.industry}</span>
                            </div>
                        </motion.div>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4 mt-8"
                    >
                        {study.liveLink && (
                            <Button asChild className="rounded-full font-bold">
                                <a href={study.liveLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Project
                                </a>
                            </Button>
                        )}
                        {study.repoLink && (
                            <Button asChild variant="outline" className="rounded-full font-bold border-white/20 bg-white/5 hover:bg-white/10">
                                <a href={study.repoLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" /> Source Code
                                </a>
                            </Button>
                        )}
                    </motion.div>
                </header>

                {/* Main Content Image */}
                <div className="w-full h-[40vh] lg:h-[70vh] mb-16 lg:mb-24 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <img
                        src={study.image}
                        alt="Project visualization"
                        className="w-full h-full object-cover object-center shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                </div>

                {/* Content Sections */}
                <div className="container mx-auto px-6 lg:px-12 xl:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Sidebar / Info */}
                        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">
                            <div className="bg-secondary/20 p-8 rounded-3xl border border-secondary/50 backdrop-blur-sm">
                                <h3 className="font-display text-xl font-bold mb-4">Project Overview</h3>
                                <p className="text-muted-foreground leading-relaxed mb-6 text-sm lg:text-base">
                                    {study.overview}
                                </p>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase text-muted-foreground mb-1">Client</span>
                                        <span className="font-medium text-lg">{study.client}</span>
                                    </div>

                                    {/* Tech Stack for better view */}
                                    {study.tags && study.tags.length > 0 && (
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                                                <Layers className="w-3 h-3" /> Technologies
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {study.tags.map((tag: string) => (
                                                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden">
                                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10 rotate-180" />
                                <blockquote className="relative z-10">
                                    <p className="text-lg italic font-medium mb-6 text-foreground/80">
                                        "{study.testimonial.quote}"
                                    </p>
                                    <footer>
                                        <strong className="block font-bold text-foreground">{study.testimonial.author}</strong>
                                        <span className="text-sm text-muted-foreground">{study.testimonial.role}</span>
                                    </footer>
                                </blockquote>
                            </div>
                        </aside>

                        {/* Main Body */}
                        <div className="lg:col-span-8 space-y-16 lg:space-y-24">

                            {/* The Problem Area */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                {/* Image before Challenge */}
                                <div className="rounded-2xl overflow-hidden h-64 md:h-80 shadow-2xl border border-white/5 rotate-1 hover:rotate-0 transition-all duration-500">
                                    <img
                                        src={study.challengeImage}
                                        alt="Challenge Context"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                                        <span className="w-12 h-1 rounded-full bg-destructive/70" />
                                        The Pain Point
                                    </h2>
                                    <h3 className="text-2xl font-medium mb-4 text-foreground/90">
                                        {study.challenge}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {study.problemDetail}
                                    </p>
                                </div>
                            </section>

                            {/* Our Approach Area */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                                        <span className="w-12 h-1 rounded-full bg-primary" />
                                        Our Strategy
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {study.approach}
                                    </p>
                                    {/* Simulated Checkpoints/Steps */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-bold">Deep Dive Analysis</h4>
                                                <p className="text-muted-foreground">Understanding the core bottlenecks.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-bold">Strategic Implementation</h4>
                                                <p className="text-muted-foreground">{study.solution}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-bold">Continuous Optimization</h4>
                                                <p className="text-muted-foreground">Monitoring metrics and adjusting for maximum impact.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Image after Solution (actually alongside it now in grid) */}
                                <div className="rounded-2xl overflow-hidden h-64 md:h-80 shadow-2xl border border-white/5 -rotate-1 hover:rotate-0 transition-all duration-500">
                                    <img
                                        src={study.solutionImage}
                                        alt="Solution Execution"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </section>

                            {/* The Outcome */}
                            <section>
                                <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-12 h-1 rounded-full bg-accent" />
                                    The Win
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    {study.outcome}
                                </p>
                                <div className="bg-secondary/30 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)]">
                                    <span className="block text-sm font-bold uppercase tracking-wider text-accent mb-2">Final Impact</span>
                                    <span className="block text-5xl lg:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
                                        {study.metric}
                                    </span>
                                </div>
                            </section>

                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-24 pt-12 border-t border-border">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-secondary/30 p-12 rounded-3xl">
                            <div>
                                <h3 className="text-3xl font-bold mb-2">Ready to be our next success story?</h3>
                                <p className="text-muted-foreground">Let's turn your challenges into big wins.</p>
                            </div>
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
};

export default CaseStudyDetail;
