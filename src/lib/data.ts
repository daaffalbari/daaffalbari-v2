export const personalInfo = {
  name: "Daffa Albari",
  title: "AI Engineer & LLM Specialist",
  email: "daffaa.albari@gmail.com",
  phone: "+62 85295451122",
  linkedin: "https://www.linkedin.com/in/daaffalbari/",
  github: "https://github.com/daaffalbari",
  location: "Indonesia",
  bio: "I help teams build AI that actually works — not just in demos, but in the real world. Love to solve real-world problems with AI.",
  tagline: "Making AI feel less like magic, more like a helpful friend",
};

export const experiences = [
  {
    id: 1,
    role: "AI Engineer/Researcher",
    company: "PT. Indonesia Indicator",
    location: "Tangerang Selatan, Indonesia",
    period: "Jan 2025 – Present",
    type: "current",
    highlights: [
      "Built an LLM framework that our whole team now uses — supports multiple AI providers and just works out of the box (saved us months of dev time)",
      "Made our AI infrastructure way cheaper (75% cost reduction) while keeping things reliable with proper observability",
      "Trained a custom image model for architectural designs — what used to take hours now takes minutes",
      "Created AI agents that write reports and presentations, so teams can focus on the actual work",
      "Built a knowledge graph system for government clients where accuracy really matters — hallucination went down to basically zero",
      "Working on a no-code app builder where you just describe what you want and it builds it",
    ],
    skills: ["LLM Agents", "RAG", "Kubernetes", "Langfuse", "Graph RAG", "MCP"],
  },
  {
    id: 2,
    role: "Data Scientist",
    company: "UNIKOM CODELABS",
    location: "Bandung, Indonesia",
    period: "Jul 2021 – Oct 2024",
    type: "past",
    highlights: [
      "Built SociaLabs — a social media analytics tool that actually makes sense of Twitter data with AI-powered insights",
      "Made Agrimate, an app that helps farmers spot crop diseases with 95% accuracy (pretty proud of this one)",
      "Created MainChick, a smart poultry management system — turns out chickens need data too!",
      "Got really good at shipping ML models to production without breaking things",
    ],
    skills: ["Python", "TensorFlow", "Docker", "AWS", "GCP", "FastAPI"],
  },
  {
    id: 3,
    role: "Machine Learning Engineer",
    company: "Bangkit Academy",
    location: "Indonesia",
    period: "Feb 2023 – Jul 2023",
    type: "past",
    highlights: [
      "Got into this pretty competitive program (20k+ applicants) — felt lucky to learn from Google, Tokopedia, and Gojek folks",
      "Built a pet adoption app that matches you with the right pet based on your lifestyle (the breed recognition hits 98%!)",
      "Learned to work across teams and ship ML models that don't break in production",
      "Got my TensorFlow certification — turns out I actually know what I'm doing 😅",
    ],
    skills: ["TensorFlow", "CNN", "Docker", "GCP", "Android"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Agrimate",
    description:
      "An app that helps farmers take better care of their crops — just snap a photo and it tells you if something's wrong. Plus smart watering and price predictions!",
    longDescription:
      "We built Agrimate because farming shouldn't require guesswork. Point your phone at a plant, get instant disease diagnosis. It even helps with funding applications and connects farmers with buyers. Pretty cool to see tech actually helping real people.",
    preview: "/images/project/agrimate/preview.png",
    mockup: "/images/project/agrimate/mockup.png",
    tags: ["CNN", "TensorFlow", "IoT", "Android", "LLM"],
    achievements: [
      "Top 20 International Microsoft Imagine Cup 2024",
      "Merit Awards APICTA Hong Kong",
      "PKM Funding 2024",
    ],
    role: "ML/AI Engineer",
    category: "Mobile/ML",
    type: "mobile",
    featured: true,
    links: {
      live: "https://agrimate.unikomcodelabs.id/",
      video: "https://youtu.be/DfnkvKKGn7w",
    },
  },
  {
    id: 2,
    title: "MainChick",
    description:
      "Think of it as a smart assistant for chicken farmers — monitors everything from temperature to early signs of disease, plus a chatbot that knows a lot about chickens.",
    longDescription:
      "MainChick keeps an eye on barn conditions 24/7 and spots potential health issues before they become problems. The AI chatbot is surprisingly good at answering chicken-related questions (we trained it well!).",
    preview: "/images/project/mainchick/preview.png",
    mockup: "/images/project/mainchick/mockup.png",
    tags: ["Machine Learning", "IoT", "Chatbot", "Android"],
    achievements: [
      "Finalist Google Solution Challenge 2024",
      "Finalist International Imagine Cup 2023",
      "Top 2 Astranauts 2023",
    ],
    role: "AI/ML Engineer",
    category: "Mobile/ML",
    type: "mobile",
    featured: true,
    links: {
      live: "https://mainchick.unikomcodelabs.id/",
      video: "https://www.youtube.com/watch?v=rNzA4hNCjNk",
      github: "https://github.com/daaffalbari/mainchick-mobile",
    },
  },
  {
    id: 3,
    title: "Peaky Blinder",
    description:
      "Eye check-ups made accessible — just use your phone camera. The AI spots signs of diabetic eye problems early, and there's a friendly chatbot to answer your health questions.",
    longDescription:
      "Not everyone can get to a specialist, so we brought the specialist to your phone. Quick, accurate eye scans that could catch problems before they get serious. The chatbot is there to help you understand what's going on.",
    preview: "/images/project/peaky_blinder/preview.png",
    mockup: "/images/project/peaky_blinder/mockup.png",
    tags: ["Azure Vision", "LLM", "Healthcare", "Android"],
    achievements: [
      "Runner up AI Innovation Compfest 2024",
      "Audience Award Compfest 2024",
      "Finalist Gemastik 2024",
    ],
    role: "AI/ML Engineer",
    category: "Healthcare",
    type: "mobile",
    featured: true,
    links: {
      github: "https://github.com/orgs/OpenEye-team/dashboard",
    },
  },
  {
    id: 4,
    title: "OPet",
    description:
      "Finding your perfect pet match — the app learns what kind of pet fits your life, shows you adorable adoptables nearby, and even identifies breeds from photos.",
    longDescription:
      "Too many pets end up abandoned because people didn't pick the right one. OPet helps you find a pet that actually fits your lifestyle, not just the cutest face (though they're pretty cute). Snap a photo and it tells you the breed too!",
    preview: "/images/project/opet/preview.png",
    mockup: "/images/project/opet/mockup.png",
    tags: ["CNN", "Image Recognition", "Maps API", "Android"],
    achievements: [],
    role: "Machine Learning Engineer",
    category: "Mobile/ML",
    type: "mobile",
    featured: false,
    links: {
      video: "https://www.youtube.com/watch?v=cgZ7gm1bPlM",
      github: "https://github.com/orgs/C23-PS008/dashboard",
    },
  },
  {
    id: 5,
    title: "SociaLabs",
    description:
      "Making sense of Twitter chaos — see what people are really talking about, how they feel about it, and who's influencing the conversation.",
    longDescription:
      "Twitter is noisy, but there's gold in there if you know where to look. Socialabs finds the patterns, tracks the sentiment, and the AI chatbot helps you dig deeper. Great for brands who want to actually understand their audience.",
    preview: "/images/project/socialabs/preview.png",
    mockup: "/images/project/socialabs/mockup.png",
    tags: ["NLP", "SNA", "Sentiment Analysis", "RAG"],
    achievements: ["APICTA 2024 at Brunei"],
    role: "AI Engineer",
    category: "Data Science",
    type: "web",
    featured: false,
    links: {
      live: "http://socialabs.me/",
    },
  },
];

export const achievements = [
  {
    id: 1,
    title: "Global Top 100 Finalist",
    organization: "Google Solution Challenge",
    year: "2023 & 2024",
    icon: "globe",
    color: "cyan",
  },
  {
    id: 2,
    title: "Top 10 of 625 Teams",
    organization: "Microsoft Imagine Cup",
    year: "2022",
    icon: "trophy",
    color: "purple",
  },
  {
    id: 3,
    title: "1st Runner-Up + Audience Choice",
    organization: "COMPFEST AI Innovation Challenge",
    year: "2023",
    icon: "award",
    color: "pink",
  },
  {
    id: 4,
    title: "National Finalist",
    organization: "Gemastik XVI Software Engineering",
    year: "2023",
    icon: "medal",
    color: "green",
  },
  {
    id: 5,
    title: "Rector's Scholarship",
    organization: "UNIKOM",
    year: "3rd sem – graduation",
    icon: "graduation",
    color: "cyan",
  },
  {
    id: 6,
    title: "TensorFlow Developer Certified",
    organization: "Google",
    year: "2023",
    icon: "certificate",
    color: "purple",
  },
];

export const skills = {
  "AI & LLM": [
    "LLM Agents",
    "A2A",
    "LangChain",
    "OpenAI SDK",
    "MCP",
    "RAG",
    "Knowledge Graph",
    "Fine-tuning",
    "OpenTelemetry",
    "Langfuse",
  ],
  "Backend & Cloud": [
    "Python",
    "FastAPI",
    "Flask",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "PostgreSQL",
    "Memgraph",
    "CI/CD",
  ],
  "ML & Data": [
    "TensorFlow",
    "PyTorch",
    "Computer Vision",
    "CNN",
    "Sentiment Analysis",
    "Social Network Analysis",
  ],
};

export const education = {
  institution: "Universitas Komputer Indonesia",
  degree: "Bachelor's Degree",
  location: "Bandung, Indonesia",
  period: "Aug 2020 – Oct 2024",
  gpa: "3.63 / 4.00 (Cumlaude)",
  coursework: [
    "Algorithms",
    "Data Structures",
    "Machine Learning",
    "Object-Oriented Programming",
    "Database",
  ],
};

export const blogPosts = [
  {
    id: 1,
    title: "Building LLM Agents That Actually Work in Production",
    excerpt:
      "Lessons from building agents that don't break at 3 AM. Covers the boring-but-important stuff like observability and graceful failures.",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["LLM", "Agents", "Production"],
    image: "/blog/llm-agents.jpg",
    slug: "building-production-llm-agents",
  },
  {
    id: 2,
    title: "When Regular RAG Isn't Cutting It — Enter Graph RAG",
    excerpt:
      "Sometimes you need your AI to understand relationships, not just keywords. Here's how knowledge graphs can help.",
    date: "2024-12-15",
    readTime: "10 min read",
    tags: ["RAG", "Knowledge Graphs", "AI"],
    image: "/blog/graph-rag.jpg",
    slug: "graph-rag-deep-dive",
  },
  {
    id: 3,
    title: "Getting Your ML Model Out of Jupyter and Into the Real World",
    excerpt:
      "A no-nonsense guide to deploying ML models. From 'it works on my machine' to 'it actually works in production.'",
    date: "2024-11-20",
    readTime: "15 min read",
    tags: ["Kubernetes", "MLOps", "Docker"],
    image: "/blog/ml-deployment.jpg",
    slug: "ml-deployment-kubernetes",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/daaffalbari",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/daaffalbari/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:daffaa.albari@gmail.com",
    icon: "mail",
  },
];
