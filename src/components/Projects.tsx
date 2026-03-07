import React, { useState } from "react";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";
import useGitHubRepos from "../hooks/useGitHubRepos";
import { portfolioData, GITHUB_USERNAME } from "../data/content";

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAllRepos, setShowAllRepos] = useState(false);

  // Fetch GitHub repositories
  const { repos, loading, error, featuredRepos } = useGitHubRepos({
    username: GITHUB_USERNAME,
    featured: portfolioData.projects
      .map((p) => p.githubUrl?.split("/").pop())
      .filter((name): name is string => Boolean(name)),
  });

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (project) => project.category === selectedCategory,
        );

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Apps" },
    { key: "mobile", label: "Mobile" },
    { key: "api", label: "APIs" },
    { key: "other", label: "Other" },
  ];

  const displayRepos = showAllRepos ? repos : featuredRepos;

  if (loading) {
    return (
      <Section
        id="projects"
        title="My Projects"
        subtitle="A showcase of my recent work and contributions"
        background="gray"
      >
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A showcase of my recent work and open source contributions"
      background="gray"
    >
      {/* Featured Projects Carousel */}
      {(portfolioData.projects.some((p) => p.featured) ||
        featuredRepos.length > 0) && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Featured Work
          </h3>
          <ProjectCarousel
            projects={portfolioData.projects.filter((p) => p.featured)}
            repos={featuredRepos}
          />
        </div>
      )}

      {/* Project Categories Filter - HIDDEN */}
      {false && portfolioData.projects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.key
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Portfolio Projects Grid */}
      {filteredProjects.length > 0 && (
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Portfolio Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* GitHub Repositories */}
      {displayRepos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              GitHub Repositories
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({repos.length} total)
              </span>
            </h3>
            {repos.length > 6 && (
              <button
                onClick={() => setShowAllRepos(!showAllRepos)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                {showAllRepos ? "Show Less" : "Show All"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 &&
        displayRepos.length === 0 &&
        !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory === "all"
                ? "Projects will appear here once the GitHub username is configured."
                : `No projects found in the "${categories.find((c) => c.key === selectedCategory)?.label}" category.`}
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View all projects
              </button>
            )}
          </div>
        )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-red-400 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-1">
            Unable to load GitHub repositories
          </h3>
          <p className="text-red-700 text-sm">{error}</p>
          <p className="text-red-600 text-xs mt-2">
            Make sure to update the GitHub username in the configuration.
          </p>
        </div>
      )}

      {/* GitHub Profile Link */}
      {GITHUB_USERNAME && (
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center btn-primary"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            View All Repositories on GitHub
          </a>
        </div>
      )}
    </Section>
  );
};

export default Projects;
