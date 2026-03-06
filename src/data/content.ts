import { ContentData } from "../types";

export const portfolioData: ContentData = {
  personal: {
    name: "Olena Shereiko",
    title: "Full-Stack Developer",
    email: "olenashereiko@gmail.com",
    phone: "+46 (73) 566-21-22",
    location: "Stockholm, Sweden",
    website: "https://os136.github.io/portfolio",
    github: "https://github.com/OS136",
    linkedin: "https://www.linkedin.com/in/olena-shereiko-83919a1a8",
    summary:
      "I'm a passionate developer with a strong interest in innovative automotive software development, with experience in responsive design, JavaScript frameworks, and API integration. I really enjoy collaborating in teams, learning new technologies, and continuously improving my coding skills.",
  },

  experiences: [
    {
      id: "exp-1",
      company: "AriaSoft Studios",
      position: "Full-stack Developer (Internship)",
      startDate: "2025-11",
      endDate: null, // Current position
      description: [
        "Working on innovative automotive software development projects",
        "Developing responsive web applications using modern JavaScript frameworks",
        "Collaborating in agile development teams to deliver high-quality solutions",
        "Gaining hands-on experience with full-stack development practices",
      ],
      technologies: [
        "JavaScript",
        "TypeScript",
        "Angular",
        "ASP.NET",
        "REST API",
      ],
      location: "Stockholm, Sweden (Hybrid)",
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "EC Education",
      subtitle: "Higher Vocational Education",
      degree: "Frontend Developer",
      field: "Web Development",
      startDate: "2024-08",
      endDate: "2026-06",
      description: [
        "Comprehensive program covering modern web development technologies",
        "Focus on JavaScript frameworks, responsive design, and user experience",
        "Hands-on projects and industry collaboration",
      ],
    },
    {
      id: "edu-2",
      institution: "Banking University",
      degree: "Master's Degree",
      field: "Finance and Management",
      startDate: "2011-01",
      endDate: "2013-12",
      description: [
        "Advanced studies in financial management and business strategy",
        "Strong analytical and problem-solving skills",
      ],
    },
    {
      id: "edu-3",
      institution: "Banking University",
      degree: "Bachelor's Degree",
      field: "Business Administration / Economics",
      startDate: "2007-01",
      endDate: "2013-12",
      description: [
        "Foundation in business principles and economic theory",
        "Developed strong analytical and communication skills",
      ],
    },
  ],

  skills: [
    { name: "HTML5/CSS3", category: "frontend", level: "expert" },
    { name: "JavaScript (ES6+)", category: "frontend", level: "expert" },
    { name: "TypeScript", category: "frontend", level: "advanced" },
    { name: "React", category: "frontend", level: "advanced" },
    { name: "Angular", category: "frontend", level: "advanced" },
    { name: "ASP.NET", category: "backend", level: "advanced" },
    { name: "REST API", category: "backend", level: "intermediate" },
    { name: "SQLite3", category: "database", level: "advanced" },
    { name: "Git", category: "tools", level: "advanced" },
    { name: "Figma", category: "tools", level: "intermediate" },
    { name: "Agile", category: "other", level: "advanced" },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Freaky Fashion React",
      description:
        "A responsive e-commerce website built with React and Tailwind CSS",
      longDescription:
        "This project showcases my work and experience through an interactive, responsive design. Features include dynamic GitHub repository integration, and mobile-first design principles.",
      technologies: [
        "React",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "GitHub API",
      ],
      githubUrl: "https://github.com/OS136/freaky-fashion-react",
      liveUrl: "https://os136.github.io/freaky-fashion-react",
      featured: true,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-2",
      title: "Freaky Fashion Angular",
      description:
        "A full-stack e-commerce website built with Angular and Tailwind CSS",
      longDescription:
        "This project showcases my work and experience through an interactive, responsive design. Features include dynamic GitHub repository integration, and mobile-first design principles.",
      technologies: [
        "Angular",
        "TypeScript",
        "Tailwind CSS",
        "GitHub API",
        "ASP.NET",
        "SQLite3",
        "REST API",
        "Node.js",
        "Git",
      ],
      githubUrl: "https://github.com/OS136/freaky-fashion-angular",
      liveUrl: "https://os136.github.io/freaky-fashion-angular",
      featured: true,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-3",
      title: "Retrendo",
      description:
        "Group project for a responsive web application built with React and Tailwind CSS",
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "React",
        "GitHub API",
        "Figma",
        "Agile",
        "Team Collaboration",
        "Project Management",
        "Version Control",
        "Responsive Design",
        "Mobile-First Design",
      ],
      githubUrl: "https://github.com/OS136/retrendo",
      liveUrl: "https://os136.github.io/retrendo",
      featured: false,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-4",
      title: "Freaky Fashion Angular Backend",
      description:
        "A full-stack e-commerce website built with Angular and Tailwind CSS",
      technologies: [
        "JavaScript",
        "Tailwind CSS",
        "Angular",
        "ASP.NET",
        "SQLite3",
      ],
      githubUrl: "https://github.com/OS136/freaky-fashion-back-end-1",
      liveUrl: "https://os136.github.io/freaky-fashion-back-end-1",
      featured: false,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-5",
      title: "Freaky Fashion Angular Backend 2",
      description:
        "A full-stack e-commerce website built with Angular and Tailwind CSS",
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Angular",
        "Node.js",
        "Docker",
        "SQLite3",
        "Migrations",
      ],
      githubUrl: "https://github.com/OS136/freaky-fashion-back-end-2",
      liveUrl: "https://os136.github.io/freaky-fashion-back-end-2",
      featured: false,
      category: "web",
      status: "completed",
    },
  ],

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/OS136",
      icon: "github",
      label: "View my code",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/olena-shereiko-83919a1a8",
      icon: "linkedin",
      label: "Connect with me",
    },
    {
      platform: "Email",
      url: "mailto:olenashereiko@gmail.com",
      icon: "mail",
      label: "Send me an email",
    },
  ],
};

// GitHub username for fetching repositories dynamically
export const GITHUB_USERNAME = "OS136";
