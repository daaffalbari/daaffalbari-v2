export const personalInfo = {
  name: "Daffa Albari",
  title: "AI Engineer & LLM Specialist",
  email: "daffaa.albari@gmail.com",
  phone: "+62 85295451122",
  linkedin: "https://www.linkedin.com/in/daaffalbari/",
  github: "https://github.com/daaffalbari",
  location: "Indonesia",
  bio: "Building intelligent systems at the intersection of AI and infrastructure. Specializing in LLM agents, RAG architectures, and scalable ML deployments.",
  tagline: "Turning complex AI into elegant solutions",
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
      "Built enterprise-grade internal LLM agent framework supporting 4+ model providers with native tool calling, RAG, MCP server, memory persistence, and multi-agent orchestration — reducing development time 5–10× versus LangChain and cutting memory usage by 70%",
      "Cut infrastructure costs 75% by optimizing LLM observability with OpenTelemetry + Langfuse; built production-grade LLM serving layer on Kubernetes with automated CI/CD pipelines",
      "Fine-tuned Qwen-image editing model for architectural design automation, reducing manual design iteration from hours to minutes",
      "Designed and deployed AI agents for automated report and presentation generation, empowering teams to produce client-facing deliverables in minutes",
      "Implemented Graph RAG architecture using Memgraph for government and defense sectors — reducing LLM hallucination to near-zero on structural queries",
      "Architected AI-powered no-code app builder enabling mobile/web app generation via natural language",
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
      "Developed SociaLabs, a social media analytics platform integrating topic modeling, sentiment analysis, and Social Network Analysis with RAG-powered AI chatbot",
      "Built Agrimate, an Android app for farmers with 95% accuracy crop disease detection and LLM-generated recommendations",
      "Created MainChick, an AI-driven poultry management system with environmental correlation analysis and LLM chatbot",
      "Automated end-to-end ML model deployment using Docker, FastAPI, Flask, AWS, and Google Cloud",
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
      "Selected as top candidate among 20,000+ applicants for the Machine Learning path in Indonesia's premier tech talent program",
      "Built an Android application with personalized pet recommendations and CNN-powered breed recognition achieving 98% accuracy",
      "Led cross-functional collaboration with Cloud and Mobile teams; containerized ML models with Docker and deployed on GCP",
      "Earned TensorFlow Developer Certificate—validating production-level expertise in CV, CNN, NLP, and time-series forecasting",
    ],
    skills: ["TensorFlow", "CNN", "Docker", "GCP", "Android"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Agrimate",
    description:
      "A multiplatform app enabling smart farming through ML, AI, and IoT integration. Features disease detection (CNN), crop recommendations, market price predictions, and automated IoT-based watering systems.",
    longDescription:
      "Agrimate enables total, accurate, and smart farming through the integration of Machine Learning, AI, and IoT for productivity, profitability, and food security. It assists farmers in applying for funding, working with an Aggregator to share post-harvest profits.",
    // preview: Card thumbnail (recommended: 800x600 for web, 400x800 for mobile)
    preview: "/images/project/agrimate/preview.png",
    // mockup: Full screenshot for phone/browser frame (recommended: 578x1263 for mobile, 1920x1080 for web)
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
      video: "https://www.youtube.com/watch?v=rNzA4hNCjNk",
    },
  },
  {
    id: 2,
    title: "MainChick",
    description:
      "A comprehensive broiler management platform integrating real-time monitoring, ML, and AI. Features environmental tracking, disease detection, and an AI chatbot for expert poultry advice.",
    longDescription:
      "MainChick includes an advanced monitoring system for tracking barn conditions like temperature, humidity, and ammonia levels. Its machine learning algorithms provide early disease detection, identifying symptoms before outbreaks occur.",
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
      github: "https://github.com/daaffalbari/mainchick-mobile",
    },
  },
  {
    id: 3,
    title: "Peaky Blinder",
    description:
      "An AI-powered app for diabetic retinopathy prediction using smartphone fundus photos. Features Azure Vision AI for disease detection and an LLM chatbot for real-time patient support.",
    longDescription:
      "Peaky Blinder provides accurate and quick disease detection, enabling easy self-checks, reducing routine exam costs, and delivering real-time analysis. The app aims to manage diabetes effectively and prevent serious complications.",
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
      "A mobile app addressing animal abandonment through AI-powered pet adoption. Features personalized recommendations, CNN-based breed recognition, and real-time shelter location services.",
    longDescription:
      "OPet leverages machine learning for personalized pet recommendations based on user preferences and lifestyle. The app uses image recognition to help users identify and learn about different breeds, making it easier to find a suitable match.",
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
      "A social media analytics platform for Twitter data analysis. Integrates topic modeling, sentiment analysis, Social Network Analysis, and an AI chatbot for data-driven insights.",
    longDescription:
      "With Socialabs, users can identify key themes being discussed, analyze user interactions, automatically respond through the chatbot, and understand public sentiment towards specific topics or brands.",
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
    title: "Building Production-Ready LLM Agents: A Deep Dive",
    excerpt:
      "Learn how to architect and deploy LLM agents that actually work in production environments with proper observability and error handling.",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["LLM", "Agents", "Production"],
    image: "/blog/llm-agents.jpg",
    slug: "building-production-llm-agents",
  },
  {
    id: 2,
    title: "Graph RAG: When Traditional RAG Isn't Enough",
    excerpt:
      "Exploring how knowledge graphs can dramatically improve RAG accuracy for complex, interconnected data domains.",
    date: "2024-12-15",
    readTime: "10 min read",
    tags: ["RAG", "Knowledge Graphs", "AI"],
    image: "/blog/graph-rag.jpg",
    slug: "graph-rag-deep-dive",
  },
  {
    id: 3,
    title: "From Notebooks to Kubernetes: ML Deployment Journey",
    excerpt:
      "A practical guide to taking your ML models from Jupyter notebooks to production-grade Kubernetes deployments.",
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
