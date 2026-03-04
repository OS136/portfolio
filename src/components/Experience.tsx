import React from "react";
import Section from "./Section";
import { portfolioData } from "../data/content";

const Experience: React.FC = () => {
  const { experiences } = portfolioData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    }

    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    let duration = `${years} year${years > 1 ? "s" : ""}`;
    if (remainingMonths > 0) {
      duration += ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    }

    return duration;
  };

  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and the roles that shaped my expertise"
    >
      <div className="max-w-4xl mx-auto">
        {experiences.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-primary-400 to-primary-200"></div>

            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative flex items-start mb-12 animate-slide-up ${
                  index % 2 === 0 ? "animate-delay-200" : "animate-delay-400"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10 mt-1"></div>

                {/* Content */}
                <div className="ml-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {experience.position}
                      </h3>
                      <h4 className="text-lg text-primary-600 font-semibold mb-2">
                        {experience.company}
                      </h4>
                    </div>

                    <div className="flex flex-col lg:text-right text-sm text-gray-600">
                      <span className="font-medium">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.endDate
                          ? formatDate(experience.endDate)
                          : "Present"}
                      </span>
                      <span className="text-gray-500">
                        {calculateDuration(
                          experience.startDate,
                          experience.endDate,
                        )}
                      </span>
                      <span className="text-gray-500 flex items-center lg:justify-end mt-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  {/* Current position indicator */}
                  {!experience.endDate && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Current Position
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  {experience.technologies.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-3">
                        Technologies & Tools
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6m0 0v6m0-6H8m0 0v-.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Experience information needed
            </h3>
            <p className="text-gray-500">
              Update the content.ts file with your work experience details.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Experience;
