import React from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Impact from "./components/Impact";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <Layout>
      <Hero />
      <Impact />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;
