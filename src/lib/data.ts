export const SITE_URL = "https://daaffalbari.dev";

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

// Projects & research now live in the Keystatic CMS (src/content/projects/), read via src/lib/projects.ts.

export const achievements = [
  {
    id: 1,
    title: "Global Top 100 Finalist",
    organization: "Google Solution Challenge",
    year: "2023 & 2024",
  },
  {
    id: 2,
    title: "Top 10 of 625 Teams",
    organization: "Microsoft Imagine Cup",
    year: "2022",
  },
  {
    id: 3,
    title: "1st Runner-Up + Audience Choice",
    organization: "COMPFEST AI Innovation Challenge",
    year: "2023",
  },
  {
    id: 4,
    title: "National Finalist",
    organization: "Gemastik XVI Software Engineering",
    year: "2023",
  },
  {
    id: 5,
    title: "Rector's Scholarship",
    organization: "UNIKOM",
    year: "3rd sem – graduation",
  },
  {
    id: 6,
    title: "TensorFlow Developer Certified",
    organization: "Google",
    year: "2023",
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
