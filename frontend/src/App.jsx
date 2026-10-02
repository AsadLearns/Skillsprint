import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import FeaturesPage from "./pages/FeaturesPage";
import ProcessPage from "./pages/ProcessPage";
import FaqPage from "./pages/FaqPage";
import VantaBackground from "./components/VantaBackground";
import ScrollReveal from "./components/ScrollReveal";
import CardTilt from "./components/CardTilt";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Profile = lazy(() => import("./pages/Profile"));
const PromptBuilderPage = lazy(() => import("./pages/PromptBuilderPage"));

function App() {
  return (
    <AuthProvider>
      <VantaBackground />
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none bg-white/80 backdrop-blur-[1px]"></div>
      <ScrollToTop />
      <ScrollReveal />
      <CardTilt />
      
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-[#070b14] flex items-center justify-center font-mono text-xs text-accent-400">Loading SkillSprint Core...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<PromptBuilderPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<ProcessPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;