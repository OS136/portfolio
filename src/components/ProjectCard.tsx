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

  return (
    <div
      className={`sky-card orbit-card group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce7f1] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(27,65,108,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(27,65,108,0.4)] sm:p-8 ${featured && project?.imageUrl && liveUrl ? "md:grid md:grid-cols-2 md:gap-x-10" : ""}`}
    >
      {featured && (
        <div className="mb-4 flex items-center md:col-span-2">
          <span className="rounded-full bg-[#fce7f2] px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-[#a5125c]">
            Featured
          </span>
        </div>
      )}
      {project?.imageUrl && liveUrl && featured && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 block md:row-span-2 md:mb-0"
        >
          <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#edf4fc] sm:h-56 md:h-full md:min-h-[16rem]">
            <img
              src={`${process.env.PUBLIC_URL}/${project.imageUrl}`}
              alt={`${title} preview`}
              className="w-full h-full object-contain hover:opacity-90 transition-opacity"
            />
          </div>
        </a>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="project-title text-xl font-bold text-gray-900 transition-colors group-hover:text-[#a5125c]">
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

        <p className="text-gray-600 mb-4">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800"
            >
              {tech}
            </span>
          ))}
          {topics.map((topic, index) => (
            <span
              key={`topic-${index}`}
              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800"
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
      <div className={`flex flex-wrap items-start gap-3 border-t border-gray-100 pt-4 ${featured && project?.imageUrl && liveUrl ? "md:self-end" : ""}`}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button h-[52px] min-w-[9rem] flex-1 px-4 text-sm"
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
            className="hero-button hero-button-primary h-[52px] min-w-[9rem] flex-1 px-4 text-sm"
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
