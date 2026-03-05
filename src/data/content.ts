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
      technologies: ["JavaScript", "TypeScript", "React", "Angular", "ASP.NET", "REST API"],
      location: "Stockholm, Sweden (Hybrid)",
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "EC Education Yrkeshögskolan",
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
    { name: "Git", category: "tools", level: "advanced" },
    { name: "Figma", category: "design", level: "intermediate" },
    { name: "Agile", category: "methodology", level: "advanced" },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Portfolio Website",
      description:
        "A responsive portfolio website built with React and Tailwind CSS",
      longDescription:
        "This project showcases my work and experience through an interactive, responsive design. Features include dynamic GitHub repository integration, smooth animations, and mobile-first design principles.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "GitHub API"],
      githubUrl: "https://github.com/OS136/portfolio",
      liveUrl: "https://os136.github.io/portfolio",
      featured: true,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-2",
      title: "Task Management App",
      description:
        "A full-stack task management application with real-time updates",
      longDescription:
        "Built a comprehensive task management system with user authentication, real-time collaboration features, and responsive design. Implemented drag-and-drop functionality and automated notifications.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      githubUrl: "https://github.com/OS136/task-manager",
      featured: true,
      category: "web",
      status: "completed",
    },
    {
      id: "proj-3",
      title: "Weather Dashboard",
      description:
        "A weather application with location-based forecasts and beautiful visualizations",
      technologies: ["JavaScript", "Chart.js", "Weather API"],
      githubUrl: "https://github.com/OS136/weather-app",
      liveUrl: "https://os136.github.io/weather-app",
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
