import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import WaitlistPage from "../pages/landing/WaitlistPage";
import AboutPage from "../pages/landing/AboutPage";
import BlogPage from "../pages/landing/BlogPage";
import ContactPage from "../pages/landing/ContactPage";
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage";
import TermsPage from "../pages/legal/TermsPage";

export default function LandingRouter() {
  return (
    <Routes>
      {/* Public Landing Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      {/* Legacy links temporarily redirect to waitlist */}
      <Route path="/pricing" element={<Navigate to="/waitlist" replace />} />
      <Route path="/login" element={<Navigate to="/waitlist" replace />} />
      <Route path="/signup" element={<Navigate to="/waitlist" replace />} />

      {/* Default/404 - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
