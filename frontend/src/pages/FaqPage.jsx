import Navbar from "../components/Navbar"
import FAQ from "../components/FAQ"
import CTABanner from "../components/CTABanner"
import Footer from "../components/Footer"

function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <title>FAQ — SkillSprint</title>
      <Navbar />
      <main className="page-content flex-grow animate-fade-in">
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default FaqPage
