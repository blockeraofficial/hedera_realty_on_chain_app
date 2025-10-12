// src/App.js
import "./App.css";

import { Routes, Route, HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ModelPage from "./pages/Model";
import FAQPage from "./pages/FAQ";
import OraclesPage from "./pages/Oracles";
import PartnersPage from "./pages/Partners";
import DashboardPage from "./pages/Portfolio";
import AuctionPage from "./pages/Auction";
import MarketPlacePage from "./pages/MarketPlace";
import VerificationPage from "./pages/Verification";
import MarketPlaceDetailPage from "./pages/MarketPlaceDetail";
import HomeLayout from "components/HomeLayout";
import PrivacyPolicy from "pages/PrivacyPolicy";
import TermsOfService from "pages/TermsAndService";

// Auth Pages
import { Register, Login } from "./pages/auth";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { AllWalletsProvider } from "./services/wallets/AllWalletsProvider";

const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AllWalletsProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <Routes>
            {/* Auth Routes (WITHOUT HomeLayout - full screen) */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />

            {/* Main App Routes (WITH HomeLayout - navbar + sidebar) */}
            <Route element={<HomeLayout />}>
              <Route path="/" element={<MarketPlacePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/compliance" element={<ModelPage />} />
              <Route path="/providers" element={<PartnersPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/property/:id" element={<MarketPlaceDetailPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Route>
          </Routes>
        </AllWalletsProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
