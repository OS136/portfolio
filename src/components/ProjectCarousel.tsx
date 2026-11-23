import React, { useState, useEffect } from "react";
import { Project, GitHubRepo } from "../types";
import ProjectCard from "./ProjectCard";

interface ProjectCarouselProps {
  projects?: Project[];
  repos?: GitHubRepo[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects = [],
  repos = [],
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine projects and repos, prioritizing projects
  const items = [
    ...projects.filter((p) => p.featured).slice(0, 3),
    ...repos.slice(
      0,
      Math.max(0, 3 - projects.filter((p) => p.featured).length),
    ),
  ];

  const totalItems = items.length;

  useEffect(() => {
    if (!autoPlay || totalItems <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalItems]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  if (totalItems === 0) {
    return (
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
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel container */}
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {"repo" in item || "name" in item ? (
                <ProjectCard repo={item as GitHubRepo} featured />
              ) : (
                <ProjectCard project={item as Project} featured />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {totalItems > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={goToPrevious}
            className="hero-button w-[52px] px-0"
            aria-label="Previous project"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="hero-button w-[52px] px-0"
            aria-label="Next project"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Dots indicator */}
      {totalItems > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8] ${
                index === currentIndex
                  ? "bg-[#3b82f6]"
                  : "bg-blue-200 hover:bg-[#d41470]"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Pause/play button for auto-play */}
      {autoPlay && totalItems > 1 && (
        <div className="flex justify-center mt-4">
          <span className="text-sm text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Auto-playing featured projects
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
