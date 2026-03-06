import React from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <Layout>
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
