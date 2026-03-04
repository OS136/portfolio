import React from "react";
import { Project, GitHubRepo } from "../types";

interface ProjectCardProps {
  project?: Project;
  repo?: GitHubRepo;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  repo,
  featured = false,
}) => {
  // Use project data if available, otherwise use repo data
  const title = project?.title || repo?.name || "Untitled Project";
  const description =
    project?.description || repo?.description || "No description available";
  const technologies =
    project?.technologies || (repo?.language ? [repo.language] : []);
  const githubUrl = project?.githubUrl || repo?.html_url;
  const liveUrl = project?.liveUrl || repo?.homepage;
  const stars = repo?.stargazers_count;
  const forks = repo?.forks_count;
  const topics = repo?.topics || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getTechBadgeColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-blue-100 text-blue-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      React: "bg-cyan-100 text-cyan-800",
      Vue: "bg-green-100 text-green-800",
      Angular: "bg-red-100 text-red-800",
      "Node.js": "bg-green-100 text-green-800",
      Python: "bg-blue-100 text-blue-800",
      Java: "bg-orange-100 text-orange-800",
      "C#": "bg-purple-100 text-purple-800",
      Go: "bg-cyan-100 text-cyan-800",
      Rust: "bg-orange-100 text-orange-800",
      HTML: "bg-orange-100 text-orange-800",
      CSS: "bg-blue-100 text-blue-800",
    };
    return colors[tech] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`card p-6 h-full flex flex-col ${featured ? "ring-2 ring-primary-500" : ""}`}
    >
      {featured && (
        <div className="flex items-center mb-3">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {(stars !== undefined || forks !== undefined) && (
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              {stars !== undefined && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {stars}
                </div>
              )}
              {forks !== undefined && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {forks}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTechBadgeColor(tech)}`}
            >
              {tech}
            </span>
          ))}
          {topics.map((topic, index) => (
            <span
              key={`topic-${index}`}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
            >
              {topic}
            </span>
          ))}
        </div>

        {repo?.updated_at && (
          <p className="text-sm text-gray-500 mb-4">
            Updated {formatDate(repo.updated_at)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            View Code
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-primary text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
