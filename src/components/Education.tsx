import React from "react";
import Section from "./Section";
import { portfolioData } from "../data/content";

const Education: React.FC = () => {
  const { education } = portfolioData;

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Section id="education" title="Education">
      <div className="space-y-8">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {edu.degree}
                </h3>
                <p className="text-lg text-blue-600 font-medium mb-1">
                  {edu.institution}
                </p>
                {edu.subtitle && (
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    {edu.subtitle}
                  </p>
                )}
                <p className="text-gray-600 mb-2">{edu.field}</p>
              </div>
              <div className="lg:text-right">
                <p className="text-sm font-medium text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            </div>

            {edu.description && (
              <div className="space-y-2">
                {edu.description.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-700 text-sm leading-relaxed"
                  >
                    • {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
