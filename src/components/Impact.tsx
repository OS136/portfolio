import React from "react";

const Impact: React.FC = () => (
  <section aria-label="Website experience" className="sky-impact overflow-hidden bg-[#102b4b] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
    <div className="container-width grid items-end gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#f9a8d4]">
          Experience in numbers
        </p>
        <p className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          Thoughtful digital experiences, built to make an impact.
        </p>
      </div>
      <div className="border-t border-white/25 pt-5 md:min-w-[17rem]">
        <p className="text-7xl font-bold leading-none tracking-[-0.07em] text-[#f6a8ce] sm:text-8xl">50+</p>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-blue-100">websites created</p>
      </div>
    </div>
  </section>
);

export default Impact;
