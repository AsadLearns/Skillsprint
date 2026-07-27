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

// BrowserRouter keeps the old scroll position across navigations, so a new
// page can open halfway down. ScrollRestoration is data-router only.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <AuthProvider>
      {/* Mounted once at the root so the clouds span every route and survive
          navigation without paying to re-initialise WebGL. The scrim above
          them holds text contrast site-wide. */}
      <VantaBackground />
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none bg-[#0b1220]/72"></div>
      <ScrollToTop />
      <ScrollReveal />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
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
    </AuthProvider>
  );
}

export default App;