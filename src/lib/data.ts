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
    title: "Enterprise LLM Agent Framework",
    description:
      "Internal framework supporting 4+ model providers with tool calling, RAG, MCP, and multi-agent orchestration. Achieved 5-10× faster development and 70% memory reduction.",
    image: "/projects/llm-framework.jpg",
    tags: ["Python", "OpenAI SDK", "Kubernetes", "Langfuse"],
    impact: "5-10× faster development",
    category: "AI/LLM",
    featured: true,
  },
  {
    id: 2,
    title: "Graph RAG for Government",
    description:
      "Knowledge graph architecture using Memgraph for defense sector queries. Structures organizational hierarchies into queryable knowledge graphs with near-zero hallucination.",
    image: "/projects/graph-rag.jpg",
    tags: ["Memgraph", "RAG", "Knowledge Graphs", "Python"],
    impact: "Near-zero hallucination",
    category: "AI/LLM",
    featured: true,
  },
  {
    id: 3,
    title: "AI Architectural Design System",
    description:
      "Fine-tuned Qwen image editing model for automated home visualizations. Reduced design iterations from hours to minutes.",
    image: "/projects/ai-design.jpg",
    tags: ["Qwen", "Fine-tuning", "Computer Vision", "Production ML"],
    impact: "Hours → Minutes",
    category: "Computer Vision",
    featured: true,
  },
  {
    id: 4,
    title: "No-Code AI App Builder",
    description:
      "Natural language to mobile/web app generation platform with prompt-driven design, tool orchestration, and secure sandboxed execution.",
    image: "/projects/no-code.jpg",
    tags: ["LLM Agents", "Sandboxed Execution", "React", "Node.js"],
    impact: "Inspired by Replit/Lovable",
    category: "AI/LLM",
    featured: false,
  },
  {
    id: 5,
    title: "Agrimate",
    description:
      "Android app empowering farmers with deep learning-based crop disease detection (95% accuracy), commodity price forecasting, and LLM-generated recommendations.",
    image: "/projects/agrimate.jpg",
    tags: ["Deep Learning", "Android", "GCP", "TensorFlow"],
    impact: "95% accuracy",
    category: "Mobile/ML",
    featured: false,
  },
  {
    id: 6,
    title: "SociaLabs",
    description:
      "Social media analytics platform with topic modeling, sentiment analysis, Social Network Analysis, and RAG-powered AI chatbot for contextual responses.",
    image: "/projects/socialabs.jpg",
    tags: ["NLP", "RAG", "Network Analysis", "Python"],
    impact: "Full-stack analytics",
    category: "Data Science",
    featured: false,
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
