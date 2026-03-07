import React, { useState } from "react";
import Section from "./Section";
import { portfolioData } from "../data/content";
import { Skill } from "../types";

const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Skills", icon: "🎯" },
    { key: "frontend", label: "Frontend", icon: "🎨" },
    { key: "backend", label: "Backend", icon: "⚙️" },
    { key: "database", label: "Database", icon: "🗄️" },
    { key: "devops", label: "DevOps", icon: "🚀" },
    { key: "tools", label: "Tools", icon: "🔧" },
    { key: "other", label: "Other", icon: "📚" },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const getSkillLevelWidth = (level: string): number => {
    const levels = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 100,
    };
    return levels[level as keyof typeof levels] || 0;
  };

  const getSkillLevelColor = (level: string): string => {
    const colors = {
      beginner: "bg-yellow-400",
      intermediate: "bg-blue-400",
      advanced: "bg-green-400",
      expert: "bg-purple-400",
    };
    return colors[level as keyof typeof colors] || "bg-gray-400";
  };

  const getSkillIcon = (skill: Skill): string => {
    const icons: { [key: string]: string } = {
      React: "⚛️",
      TypeScript: "📘",
      JavaScript: "📜",
      "Node.js": "🟢",
      "HTML/CSS": "🎨",
      Vue: "💚",
      Angular: "🅰️",
      Git: "📚",
      Docker: "🐳",
      PostgreSQL: "🐘",
      MongoDB: "🍃",
      Redis: "🔴",
      AWS: "☁️",
      Kubernetes: "☸️",
    };
    return icons[skill.name] || "💻";
  };

  return (
    <Section
      id="skills"
      title="Skills & Technologies"
      subtitle="The tools and technologies I work with to bring ideas to life"
      background="gray"
    >
      {/* HIDE Category Filter */}
   
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.key
                  ? "bg-primary-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:shadow-md"
              }`}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              {category.label}
              <span className="ml-2 text-xs opacity-75">
                (
                {selectedCategory === category.key
                  ? filteredSkills.length
                  : category.key === "all"
                    ? skills.length
                    : skills.filter((s) => s.category === category.key).length}
                )
              </span>
            </button>
          ))}
        </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getSkillIcon(skill)}</span>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    skill.level === "expert"
                      ? "bg-purple-100 text-purple-800"
                      : skill.level === "advanced"
                        ? "bg-green-100 text-green-800"
                        : skill.level === "intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {skill.level}
                </span>
              </div>

              {/* Skill Level Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Proficiency</span>
                  <span className="font-medium">
                    {getSkillLevelWidth(skill.level)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getSkillLevelColor(skill.level)} transition-all duration-1000 ease-out`}
                    style={{ width: `${getSkillLevelWidth(skill.level)}%` }}
                  ></div>
                </div>
              </div>

              {/* Experience Years */}
              {skill.years && (
                <div className="flex items-center text-sm text-gray-600">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {skill.years} year{skill.years !== 1 ? "s" : ""} experience
                </div>
              )}
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No skills found
          </h3>
          <p className="text-gray-500 mb-4">
            {selectedCategory === "all"
              ? "Skills will appear here once you update the content configuration."
              : `No skills found in the "${categories.find((c) => c.key === selectedCategory)?.label}" category.`}
          </p>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all skills
            </button>
          )}
        </div>
      )}

      {/* Skills Summary */}
      {skills.length > 0 && (
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Skills Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {categories.slice(1).map((category) => {
              const categorySkills = skills.filter(
                (s) => s.category === category.key,
              );
              return (
                <div key={category.key} className="p-4">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {categorySkills.length}
                  </div>
                  <div className="text-sm text-gray-600">{category.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
};

export default Skills;
