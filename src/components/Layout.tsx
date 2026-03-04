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
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-width">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Olena Shereiko. Built with React &
              Tailwind CSS.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Deployed on GitHub Pages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
