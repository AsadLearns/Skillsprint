import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PromptStudio from "../components/PromptStudio";
import ScrollSkillsShowcase from "../components/ScrollSkillsShowcase";
import AiVideoDemo from "../components/AiVideoDemo";
import Features from "../components/Features";
import ProjectStatus from "../components/ProjectStatus";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PromptStudio />
      <ScrollSkillsShowcase />
      <AiVideoDemo />
      <Features />
      <ProjectStatus />
      <CTABanner />
      <Footer />
    </>
  );
}

export default Home;
