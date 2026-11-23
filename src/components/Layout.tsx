import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="relative">{children}</main>
      <footer className="border-t border-[#bfdbfe] bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="container-width">
          <div className="text-center">
            <p className="text-[#30445e]">
              © {new Date().getFullYear()} Olena Shereiko. Built with React &
              Tailwind CSS.
            </p>
            <p className="mt-2 text-sm text-[#52677e]">
              Deployed on GitHub Pages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
