import { ContentData } from "../types";

export const portfolioData: ContentData = {
  personal: {
    name: "Olena Shereiko",
    title: "Software Developer",
    email: "olenashereiko@gmail.com", // TODO: Update with your actual email
    phone: "+46 (73) 566-21-22", // TODO: Update with your actual phone
    location: "Stockholm, Sweden", // TODO: Update with your actual location
    website: "https://your-website.com", // TODO: Update with your actual website
    github: "https://github.com/your-username", // TODO: Update with your actual GitHub
    linkedin: "https://linkedin.com/in/your-profile", // TODO: Update with your actual LinkedIn
    summary:
      "Passionate software developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.",
  },

  experiences: [
    {
      id: "exp-1",
      company: "Your Current Company",
      position: "Software Developer",
      startDate: "2023-01",
      endDate: null, // Current position
      description: [
        "Developed and maintained web applications using React and TypeScript",
        "Collaborated with cross-functional teams to deliver high-quality software solutions",
        "Implemented responsive designs and improved user experience",
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      location: "Remote",
    },
    {
      id: "exp-2",
      company: "Previous Company",
      position: "Junior Developer",
      startDate: "2022-01",
      endDate: "2022-12",
      description: [
        "Built responsive web applications using modern JavaScript frameworks",
        "Participated in code reviews and followed best practices",
        "Learned and applied new technologies quickly",
      ],
      technologies: ["JavaScript", "React", "CSS", "Git"],
      location: "Your City",
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "Your University",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: "2018-09",
      endDate: "2022-06",
      description: [
        "Relevant coursework: Data Structures, Algorithms, Web Development",
        "Graduated with honors",
      ],
    },
  ],

  skills: [
    { name: "React", category: "frontend", level: "advanced" },
    { name: "TypeScript", category: "frontend", level: "advanced" },
    { name: "JavaScript", category: "frontend", level: "expert" },
    { name: "HTML/CSS", category: "frontend", level: "expert" },
    { name: "Tailwind CSS", category: "frontend", level: "advanced" },
    { name: "Node.js", category: "backend", level: "intermediate" },
    { name: "Python", category: "backend", level: "intermediate" },
    { name: "PostgreSQL", category: "database", level: "intermediate" },
    { name: "Git", category: "tools", level: "advanced" },
    { name: "Docker", category: "devops", level: "beginner" },
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
      githubUrl: "https://github.com/your-username/portfolio",
      liveUrl: "https://your-username.github.io/portfolio",
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
      githubUrl: "https://github.com/your-username/task-manager",
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
      githubUrl: "https://github.com/your-username/weather-app",
      liveUrl: "https://your-username.github.io/weather-app",
      featured: false,
      category: "web",
      status: "completed",
    },
  ],

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/your-username", // TODO: Update with your GitHub
      icon: "github",
      label: "View my code",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/your-profile", // TODO: Update with your LinkedIn
      icon: "linkedin",
      label: "Connect with me",
    },
    {
      platform: "Email",
      url: "mailto:your.email@example.com", // TODO: Update with your email
      icon: "mail",
      label: "Send me an email",
    },
  ],
};

// GitHub username for fetching repositories dynamically
export const GITHUB_USERNAME = "olenashereiko";
