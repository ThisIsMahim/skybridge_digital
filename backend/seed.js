const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const Lead = require('./models/Lead');

dotenv.config();

const users = [
  {
    username: 'admin@skybridge.com',
    password: 'admin', // Will be hashed by pre-save hook
    role: 'admin',
  }
];

const projects = [
  {
    slug: "crypto-fintech-dashboard",
    title: "High-Fidelity Crypto Investment Dashboard",
    client: "Dharmendra Kumar",
    industry: "Web Design",
    challenge: "The client needed a high-trust, secure frontend for a crypto investment platform. The primary challenge was visualizing complex real-time data (ROI, Market Trends) and managing intricate wallet states (Deposit/Withdrawal flows) without backend latency.",
    solution: "We engineered a component-driven React architecture. We utilized Chart.js for real-time market visualization and built a mock-wallet ecosystem to simulate transaction flows instantly. The UI was hardened with 2FA visual flows to establish user trust immediately.",
    metric: "MVP Delivered in 10 Days",
    imageUrl: "/images/projects/crypto-dashboard-main.jpg",
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
    tags: ['React', 'Fintech', 'Dashboard'],
    featured: true,
  },
  {
    slug: "sub4sub-saas-engine",
    title: "Gamified Micro-Tasking SaaS Engine",
    client: "Confidential (SaaS Sector)",
    industry: "Web Design",
    challenge: "Replicating a mobile-only 'Sub4Sub' coin economy on the web. The critical technical hurdle was preventing fraud by verifying YouTube actions (Likes/Subs) in real-time before awarding virtual currency.",
    solution: "We architected a Next.js Full-Stack application integrating the YouTube Data API for verification. We implemented 'Better Auth' for secure sessions and a custom internal ledger system to manage the 'Coin-to-BDT' exchange rates and withdrawal requests.",
    metric: "100% Automated API Verification",
    imageUrl: "/images/projects/sub4sub-main.jpg",
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
    tags: ['SaaS', 'Next.js', 'API Integration'],
    featured: true,
  },
  {
    slug: "softsaasi-growth-campaign",
    title: "Video Marketing & Ad Infrastructure",
    client: "Softsaasi",
    industry: "Marketing",
    challenge: "The client had a great product but low visibility. They needed a rapid injection of brand awareness and a structured ad pipeline within a strict 2-week window.",
    solution: "We executed a 'Growth Sprint.' We produced and edited 2 high-conversion video ads and designed 4 banner creatives. We then set up the Meta Business Suite backend to target specific audience demographics effectively.",
    metric: "2-Week Rapid Launch",
    imageUrl: "/images/projects/softsaasi-main.jpg",
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
    tags: ['Marketing', 'Video Ads', 'Growth Hacking'],
    featured: false,
  },
];

const blogs = [
  {
    title: 'The Future of Web Development in 2025',
    slug: 'future-web-development-2025',
    summary: 'Explore the emerging trends that are shaping the future of the web, from AI-driven interfaces to WebAssembly and edge computing.',
    content: `# The Future of Web Development

As we move further into the decade, web development is evolving at a breakneck pace. Here are the key trends to watch:

## 1. AI-Driven Development
Artificial Intelligence is no longer just a buzzword. Tools like GitHub Copilot and ChatGPT are changing how we write code, allowing for faster prototyping and fewer bugs.

## 2. WebAssembly (Wasm)
Performance is king. WebAssembly allows high-performance applications (like video editors and games) to run directly in the browser with near-native speed.

## 3. The Rise of Edge Computing
Moving logic closer to the user reduces latency and improves experience. Edge functions are becoming a standard part of modern deployment strategies.

## Conclusion
Stay curious and keep learning. The tools might change, but the principles of building great user experiences remain the same.`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['Tech Trends', 'Web Development', 'AI'],
    isPublished: true,
    author: 'Admin',
  },
  {
    title: 'Optimizing React Performance for Scale',
    slug: 'optimizing-react-performance',
    summary: 'A deep dive into advanced techniques for keeping your React applications snappy, including virtualization, memoization, and code-splitting.',
    content: `# Optimizing React Performance

React is fast, but large applications can become sluggish if not managed correctly.

## Use.Memo and Use.Callback correctly
Don't just wrap everything. Understand when re-renders actually hurt performance.

## Virtualize Long Lists
Rendering thousands of DOM nodes is a recipe for disaster. Libraries like \`react-window\` essentially solve this by only rendering what's visible.

## Code Splitting
Break your bundle into smaller chunks. Lazy load routes and heavy components to speed up the initial load time.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    tags: ['React', 'Performance', 'Code Quality'],
    isPublished: true,
    author: 'Admin',
  },
  {
    title: 'Why UI/UX Design Matters More Than Ever',
    slug: 'why-ui-ux-matters',
    summary: 'In a crowded digital marketplace, user experience is the key differentiator. Learn how good design drives conversion and customer loyalty.',
    content: `# UI/UX Design: The Competitive Edge

It's not enough to just work. It has to feel good.

## First Impressions
Users form an opinion about your site in milliseconds. Aesthetics matter.

## Usability is Accessibility
Good design includes everyone. Ensure your site is navigable by keyboard and screen readers.

## Conversion Optimization
A clear path to action reduces friction and boosts sales. Design is not just art; it's business logic made visual.`,
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    tags: ['Design', 'UI/UX', 'Business'],
    isPublished: true,
    author: 'Admin',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Lead.deleteMany({}); // Optional: Clear leads too for a fresh start

    console.log('Data Cleared');

    // Create Users
    for (const user of users) {
      await User.create(user);
    }
    console.log('Users Seeded');

    // Create Projects
    await Project.insertMany(projects);
    console.log('Projects Seeded');

    // Create Blogs
    await Blog.insertMany(blogs);
    console.log('Blogs Seeded');

    console.log('Seeding Completed Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
