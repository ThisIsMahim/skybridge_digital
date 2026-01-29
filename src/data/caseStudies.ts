
export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    industry: "SEO" | "Web Design" | "Marketing" | "Branding";
    challenge: string;
    solution: string;
    metric: string;
    image: string;
    logo: string;
    summary: string;
    overview: string;
    problemDetail: string;
    approach: string;
    outcome: string;
    testimonial: {
        quote: string;
        author: string;
        role: string;
    };
}

export const caseStudies: CaseStudy[] = [
    {
        id: "technova-seo-growth",
        title: "How we increased TechNova's organic traffic by 150% in 6 months",
        client: "TechNova Solutions",
        industry: "SEO",
        challenge: "Struggling with low visibility and declining organic traffic despite high-quality content.",
        solution: "Implemented a comprehensive SEO audit, technical optimization, and a targeted backlink strategy.",
        metric: "+150% Traffic",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        logo: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
        summary: "Recovered lost rankings and drove high-quality organic leads.",
        overview: "TechNova Solutions is a leading B2B SaaS provider. They approached us to help them regain their search engine rankings and drive more qualified leads through organic search.",
        problemDetail: "TechNova had excellent product documentation and blog content, but technical SEO issues and a weak domain authority were holding them back. They were ranking on page 2 or 3 for high-value keywords, resulting in missed opportunities.",
        approach: "We started with a deep-dive technical audit, fixing crawl errors and optimizing site speed. We then revamped their keyword strategy to target high-intent search terms and executed a white-hat link-building campaign to boost authority.",
        outcome: "Within 6 months, organic traffic surged by 150%. TechNova now ranks in the top 3 results for their primary keywords, leading to a significant increase in demo requests.",
        testimonial: {
            quote: "The results speak for themselves. detailed, data-driven, and incredibly effective.",
            author: "Sarah Jenkins",
            role: "CMO at TechNova"
        }
    },
    {
        id: "greenearth-redesign",
        title: "Revamping GreenEarth's digital presence to boost conversion by 40%",
        client: "GreenEarth Organics",
        industry: "Web Design",
        challenge: "An outdated website that failed to communicate the brand's premium value and had poor mobile usability.",
        solution: "Designed a modern, responsive e-commerce experience with a focus on user journey and brand storytelling.",
        metric: "+40% Sales",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        logo: "https://cdn-icons-png.flaticon.com/512/1598/1598431.png",
        summary: "Modernized the e-commerce experience to boost mobile conversions.",
        overview: "GreenEarth Organics sells premium organic produce. They needed a website that reflected their commitment to quality and made purchasing easy for mobile users.",
        problemDetail: "The old site was clunky, difficult to navigate on phones, and didn't showcase the vibrant imagery of their products. Bounce rates were high, and cart abandonment was a major issue.",
        approach: "We rebuilt the site from the ground up using a headless CMS for speed and flexibility. We implemented a clean, minimal design that highlighted product photography and streamlined the checkout process to just 3 steps.",
        outcome: "The new site launched to rave reviews. Mobile conversion rates doubled, and overall sales increased by 40% in the first quarter post-launch.",
        testimonial: {
            quote: "Our customers love the new look! It's so much easier for them to shop, and our sales numbers prove it.",
            author: "David Chen",
            role: "Founder"
        }
    },
    {
        id: "urbanbites-viral",
        title: "Scaling UrbanBites' social engagement by 300% with viral content",
        client: "UrbanBites",
        industry: "Marketing",
        challenge: "Building brand awareness in a crowded food delivery market with a limited ad budget.",
        solution: "A creative social media campaign leveraging user-generated content and influencer partnerships.",
        metric: "300% Engagement",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
        logo: "https://cdn-icons-png.flaticon.com/512/2504/2504914.png",
        summary: "Ignited local brand awareness through viral social campaigns.",
        overview: "UrbanBites is a new food delivery app focusing on local eats. They needed to make a splash to compete with established giants.",
        problemDetail: "With a small budget, competing on paid ads was impossible. They needed a way to grow organically and build a loyal community of foodies.",
        approach: "We launched the 'Hidden Gems' campaign, encouraging users to share their favorite local spots. We partnered with micro-influencers to kickstart the trend and used short-form video content on TikTok and Reels.",
        outcome: "The campaign went viral locally, driving a 300% increase in social engagement and a 50% spike in app downloads during the campaign period.",
        testimonial: {
            quote: "We didn't expect to grow this fast! The strategy was perfect for our brand and budget.",
            author: "Jessica Lee",
            role: "Marketing Director"
        }
    }
];
