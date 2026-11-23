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
    <Section id="education" title="Education" eyebrow="03 / Foundations" background="gray">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-3xl border border-[#dce7f1] bg-white p-6 sm:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#102b4b]">
                  {edu.degree}
                </h3>
                <p className="mb-1 text-lg font-medium text-[#b81868]">
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
