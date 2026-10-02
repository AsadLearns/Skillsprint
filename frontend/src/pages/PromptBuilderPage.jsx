import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PromptStudio from "../components/PromptStudio"

function PromptBuilderPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-1 pt-6">
        <PromptStudio />
      </div>

      <Footer />
    </div>
  )
}

export default PromptBuilderPage
