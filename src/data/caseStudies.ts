
export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    industry: "SEO" | "Web Design" | "Marketing" | "Branding";
    challenge: string;
    solution: string;
    metric: string;
    image: string;
    challengeImage: string;
    solutionImage: string;
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
    id: "crypto-fintech-dashboard",
    title: "High-Fidelity Crypto Investment Dashboard",
    client: "Dharmendra Kumar",
    industry: "Web Design",
    challenge: "The client needed a high-trust, secure frontend for a crypto investment platform. The primary challenge was visualizing complex real-time data (ROI, Market Trends) and managing intricate wallet states (Deposit/Withdrawal flows) without backend latency.",
    solution: "We engineered a component-driven React architecture. We utilized Chart.js for real-time market visualization and built a mock-wallet ecosystem to simulate transaction flows instantly. The UI was hardened with 2FA visual flows to establish user trust immediately.",
    metric: "MVP Delivered in 10 Days",
    image: "/images/projects/crypto-dashboard-main.jpg",
    challengeImage: "/images/projects/crypto-challenge.jpg",
    solutionImage: "/images/projects/crypto-solution.jpg",
    logo: "/images/clients/crypto-logo.png",
    summary: "A React-based financial interface focusing on real-time data visualization and secure user flows.",
    overview: "Fintech interfaces live or die by trust. We built a 'Systems-First' dashboard that prioritizes data clarity and security visualization.",
    problemDetail: "Investors need to see their money grow in real-time. Static tables were not enough; the client needed dynamic interaction.",
    approach: "We adopted a 'Component-First' strategy, breaking the dashboard into isolated widgets (Wallet, ROI, Market) for faster rendering.",
    outcome: "Successfully delivered a high-performance MVP that allowed the client to secure backend funding.",
    testimonial: {
      quote: "The frontend mockups and logic flows were delivered exactly to spec, allowing us to move straight to backend integration.",
      author: "Dharmendra Kumar",
      role: "Founder",
    },
  },
  {
    id: "sub4sub-saas-engine",
    title: "Gamified Micro-Tasking SaaS Engine",
    client: "Confidential (SaaS Sector)",
    industry: "Web Design",
    challenge: "Replicating a mobile-only 'Sub4Sub' coin economy on the web. The critical technical hurdle was preventing fraud by verifying YouTube actions (Likes/Subs) in real-time before awarding virtual currency.",
    solution: "We architected a Next.js Full-Stack application integrating the YouTube Data API for verification. We implemented 'Better Auth' for secure sessions and a custom internal ledger system to manage the 'Coin-to-BDT' exchange rates and withdrawal requests.",
    metric: "100% Automated API Verification",
    image: "/images/projects/sub4sub-main.jpg",
    challengeImage: "/images/projects/sub4sub-challenge.jpg",
    solutionImage: "/images/projects/sub4sub-solution.jpg",
    logo: "/images/clients/saas-logo.png",
    summary: "A complex full-stack SaaS application connecting social APIs with a virtual fintech economy.",
    overview: "This project required bridging external platforms (YouTube) with internal logic (Wallet System) securely.",
    problemDetail: "Users often claim rewards without doing the task. We needed a 'Trust-But-Verify' system using Google's APIs.",
    approach: "We used Next.js for server-side API handling to keep keys secure, ensuring no user could spoof a transaction.",
    outcome: "A fully functional web-replica of the mobile app, enabling a new revenue stream for the client.",
    testimonial: {
      quote: "Skybridge Systems handled the complex API logic and wallet security, delivering a stable functional clone of our app.",
      author: "Lead Contractor",
      role: "Project Lead",
    },
  },
  {
    id: "softsaasi-growth-campaign",
    title: "Video Marketing & Ad Infrastructure",
    client: "Softsaasi",
    industry: "Marketing",
    challenge: "The client had a great product but low visibility. They needed a rapid injection of brand awareness and a structured ad pipeline within a strict 2-week window.",
    solution: "We executed a 'Growth Sprint.' We produced and edited 2 high-conversion video ads and designed 4 banner creatives. We then set up the Meta Business Suite backend to target specific audience demographics effectively.",
    metric: "2-Week Rapid Launch",
    image: "/images/projects/softsaasi-main.jpg",
    challengeImage: "/images/projects/softsaasi-challenge.jpg",
    solutionImage: "/images/projects/softsaasi-solution.jpg",
    logo: "/images/clients/softsaasi-logo.png",
    summary: "End-to-end creative production and ad management sprint for a software brand.",
    overview: "Marketing is a system, not just art. We built the creative assets and the delivery pipeline simultaneously.",
    problemDetail: "Static posts were not converting. The client needed dynamic video content to stop the scroll.",
    approach: "We used a 'Video-First' strategy, prioritizing motion content for the top of the funnel.",
    outcome: "Delivered a complete library of ad assets and a configured ad manager ready for scaling.",
    testimonial: {
      quote: "Delivered professional video assets and handled the ad setup efficiently within our tight timeline.",
      author: "Softsaasi Team",
      role: "Marketing Director",
    },
  },
];

export default caseStudies;
