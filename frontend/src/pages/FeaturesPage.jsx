import Navbar from "../components/Navbar"
import Features from "../components/Features"
import CTABanner from "../components/CTABanner"
import Footer from "../components/Footer"

function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <title>Features — SkillSprint</title>
      <Navbar />
      <main className="page-content flex-grow animate-fade-in">
        <Features />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default FeaturesPage
