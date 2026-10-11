import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import FeaturesPage from "./pages/FeaturesPage";
import ProcessPage from "./pages/ProcessPage";
import FaqPage from "./pages/FaqPage";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import PromptBuilderPage from "./pages/PromptBuilderPage";
import Skills from "./pages/Skills";

import VantaBackground from "./components/VantaBackground";
import ScrollReveal from "./components/ScrollReveal";
import CardTilt from "./components/CardTilt";
import Cursor3DManager from "./components/Cursor3DManager";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <VantaBackground />
        <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none bg-white/80 backdrop-blur-[1px]"></div>
        <ScrollToTop />
        <ScrollReveal />
        <CardTilt />
        <Cursor3DManager />
        
        <div className="relative z-10">
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
            <Route path="/skills" element={<Skills />} />
            {/* Catch-all redirect to prevent blank page on unrecognized paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;