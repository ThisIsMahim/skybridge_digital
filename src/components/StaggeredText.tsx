import React from "react";

interface StaggeredTextProps {
    text: string;
    className?: string; // For the outer wrapper
    textClassName?: string; // For inner text styling if needed
}

export const StaggeredText = ({ text, className = "", textClassName = "" }: StaggeredTextProps) => {
    return (
        <span className={`inline-flex overflow-hidden ${className}`}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="relative inline-block overflow-hidden"
                    style={{
                        // Maintain layout space for the character
                    }}
                >
                    {/* Spacer to give the span dimensions */}
                    <span className={`invisible opacity-0 ${textClassName}`}>
                        {char === " " ? "\u00A0" : char}
                    </span>

                    {/* First/Original Character: Slides UP */}
                    <span
                        className={`absolute top-0 left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${textClassName}`}
                        style={{ transitionDelay: `${index * 0.03}s` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>

                    {/* Second/New Character: Slides IN from BOTTOM */}
                    <span
                        className={`absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-accent ${textClassName}`}
                        style={{ transitionDelay: `${index * 0.03}s` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ))}
        </span>
    );
};
