import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    {
        name: "C.M. Mahim Masrafi",
        title: "CEO & Lead Solution Architect",
        role: "Full-Stack Specialist (MERN). The builder.",
        skills: ["Next.js", "System Architecture"],
        socials: [
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Github, href: "#", label: "GitHub" },
        ],
        image: "https://placehold.co/400x400/png",
        gradient: "from-blue-500/20 to-cyan-500/20", // Deep Ocean/Cyan
    },
    {
        name: "Touhidul Islam",
        title: "COO & Head of Growth",
        role: "Digital Strategist. The engine.",
        skills: ["Business Strategy", "Growth"],
        socials: [
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" },
        ],
        image: "https://placehold.co/400x400/png",
        gradient: "from-emerald-500/20 to-green-500/20", // Growth/Green
    },
];

const TeamSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.2)",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="team" className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="mb-16 text-center space-y-4">
                    <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                        The Team
                    </span>
                    <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                        Meet Leadership
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group relative w-full max-w-[320px]"
                        >
                            {/* Card Base */}
                            <div className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-[2rem] p-6 text-center transition-all duration-500 hover:shadow-2xl hover:bg-secondary/50 hover:-translate-y-2 h-full flex flex-col">

                                {/* Image Area with Circular Gradient Background */}
                                <div className="relative mx-auto mb-6 w-48 h-48 flex items-center justify-center">
                                    {/* Circle Background */}
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${member.gradient} blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <div className={`absolute inset-4 rounded-full bg-gradient-to-tr ${member.gradient} opacity-20 group-hover:scale-110 transition-transform duration-500 ease-out`} />

                                    {/* Image */}
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="relative w-full h-full object-cover rounded-full z-10 border-4 border-background/50 shadow-sm"
                                    />

                                    {/* Floating Social Pill - Appears on Hover (or styled to look like it floats) */}
                                    <div className="absolute -bottom-4 z-20 flex items-center justify-center gap-2 bg-background/90 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full shadow-lg opacity-100 translate-y-0 transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40">
                                        {member.socials.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                className="text-muted-foreground hover:text-accent transition-colors p-1"
                                                aria-label={social.label}
                                            >
                                                <social.icon size={16} />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2 pt-4">
                                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-medium text-accent/80 uppercase tracking-wide">
                                        {member.title}
                                    </p>
                                    <p className="text-muted-foreground text-sm leading-relaxed px-2 opacity-80">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
