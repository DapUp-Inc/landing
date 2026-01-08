import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/landing/LoginPage";
import SignupPage from "../pages/landing/SignupPage";
import PricingPage from "../pages/landing/PricingPage";

export default function LandingRouter() {
  return (
    <Routes>
      {/* Public Landing Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Default/404 - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
