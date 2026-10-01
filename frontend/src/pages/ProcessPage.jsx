import Navbar from "../components/Navbar"
import HowItWorks from "../components/HowItWorks"
import CTABanner from "../components/CTABanner"
import Footer from "../components/Footer"

function ProcessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <title>How it works — SkillSprint</title>
      <Navbar />
      <main className="page-content flex-grow animate-fade-in">
        <HowItWorks />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default ProcessPage
