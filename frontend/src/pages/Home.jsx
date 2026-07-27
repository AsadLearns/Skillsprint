import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ProjectStatus from "../components/ProjectStatus";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

// The landing page used to also stack HowItWorks and FAQ in full. Both now
// have their own routes linked from the nav (/how-it-works, /faq), so
// repeating them here just made the homepage a wall of text. The components
// are unchanged and still used by those pages.
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ProjectStatus />
      <CTABanner />
      <Footer />
    </>
  );
}

export default Home;
