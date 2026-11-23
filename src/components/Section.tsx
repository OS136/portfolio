import React from "react";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray";
  eyebrow?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = "",
  background = "white",
  eyebrow,
}) => {
  return (
    <section
      id={id}
      className={`sky-section scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32 ${
        background === "gray" ? "bg-gradient-to-br from-gray-50 to-gray-100" : "bg-gray-50"
      } ${className}`}
    >
      <div className="container-width">
        <div className="sky-heading mb-12 border-t border-[#cbd9e9] pt-6 sm:mb-16">
          {eyebrow && (
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#d41470]">
              {eyebrow}
            </p>
          )}
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.05em] text-gray-900 sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-md text-base leading-relaxed text-[#52677e] sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
