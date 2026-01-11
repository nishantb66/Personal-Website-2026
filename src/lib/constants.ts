// Site configuration constants

export const PERSONAL_INFO = {
    name: "Nishant",
    lastName: "Baruah",
    role: "Backend Developer",
    description: "Crafting robust backend solutions and intelligent systems. Specializing in web development, machine learning, and data-driven applications.",
    location: "Navi Mumbai, India",
    resumePath: "/resume/resume.pdf",
};

export const SKILLS = [
    "Node.js", "Express", "Flask", "Django", "Next.js", "React", "TypeScript",
    "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS",
    "Machine Learning", "NLP", "Deep Learning", "Data Analysis"
];

export const SOCIAL_LINKS = {
    linkedin: {
        url: "https://www.linkedin.com/in/nishantbaru/",
        label: "LinkedIn",
    },
    github: {
        url: "https://github.com/nishantb66",
        label: "GitHub",
    },
    email: {
        url: "mailto:nishantbaruah3@gmail.com",
        label: "Email",
    },
};

export const PROJECTS = [
    {
        title: "NLP Chatbot",
        company: "ONGC",
        description: "Fully offline chatbot for department-specific needs on closed LAN. Built with advanced NLP techniques for intelligent conversation handling.",
        tech: ["ANN", "NLP", "Flask", "Docker"],
        year: "2024",
        color: "#4f46e5",
        link: "https://github.com/nishantb66",
    },
    {
        title: "Accident Analysis System",
        company: "BPCL",
        description: "Robust profiling system with AI-powered fault determination. Automated incident analysis for enhanced workplace safety.",
        tech: ["Node.js", "Flask", "AWS", "PostgreSQL"],
        year: "2025",
        color: "#06b6d4",
        link: "https://github.com/nishantb66",
    },
];

export const EXPERIENCES = [
    {
        role: "Backend Developer",
        company: "LenDenClub",
        period: "Jun 2025 - Present",
        description: "Building scalable fintech solutions and microservices architecture.",
        current: true,
    },
    {
        role: "Software Co-op Intern",
        company: "BPCL",
        period: "Jan 2025 - May 2025",
        description: "Developed AI-powered safety analysis systems for industrial applications.",
    },
    {
        role: "Developer Intern",
        company: "ONGC",
        period: "May 2024 - Jul 2024",
        description: "Created offline NLP chatbot solutions for enterprise deployment.",
    },
];

export const AI_ENGINEERING = {
    title: "Engineering with AI",
    subtitle: "AI as a Force Multiplier",
    sections: [
        {
            type: "hero",
            text: "For me, Artificial Intelligence is not a replacement for engineering skill—it is a force multiplier for it."
        },
        {
            type: "paragraph",
            text: "As a full-stack developer, I view AI as an intelligent collaborator that enhances how I design systems, reason about complexity, and deliver production-ready solutions at scale. I use AI to accelerate learning curves, deconstruct complex problems, validate architectural decisions, and iterate on ideas with precision—allowing me to achieve 10× efficiency without compromising code quality or system robustness."
        },
        {
            type: "paragraph",
            text: "On the backend, AI helps me think deeply about system design, data flow, performance optimization, and edge cases, enabling faster prototyping while maintaining strong engineering fundamentals. On the frontend, it assists in refining UI/UX logic, interaction flows, accessibility, and visual consistency, ensuring that products are not only functional but intuitive and polished."
        },
        {
            type: "highlight",
            text: "Importantly, I do not treat AI as an answer generator. I treat it as a thinking amplifier—a tool that augments my decision-making while I remain fully accountable for correctness, scalability, and maintainability."
        },
        {
            type: "paragraph",
            text: "Every AI-assisted output is reviewed, refined, and aligned with real-world constraints and best practices."
        },
        {
            type: "paragraph",
            text: "AI allows me to shift my focus from repetitive tasks to higher-order problem solving: architecture, product thinking, performance trade-offs, and long-term maintainability. It enables me to move faster, think broader, and build smarter systems."
        },
        {
            type: "conclusion",
            main: "In short, AI is not what builds my projects—my engineering judgment does.",
            sub: "AI simply ensures that my ideas move from concept to execution faster, cleaner, and with greater impact."
        }
    ]
};
