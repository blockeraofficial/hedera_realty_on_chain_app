import './App.css';

import { Routes, Route, HashRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import ModelPage from "./pages/Model";
import FAQPage from "./pages/FAQ";
// import StakingPage from "./pages/Staking";
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
// Hedera Connection
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider'; 
// Hedera
import { useWalletInterface } from "./services/wallets/useWalletInterface";
import { ethers } from "ethers";
// ------------------------------------------------------------------------

const App = () => {

  return (
    <HashRouter>
      <AllWalletsProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <HomeLayout>
        <Routes>
          <Route path="/" element={<MarketPlacePage/>} />
          <Route path="/dashboard" element=
            {
              <DashboardPage
              />
            } 
          />
          {/*
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/oracles" element={<OraclesPage />} />
          <Route path="/auction" element={<AuctionPage />} />
          */}
          <Route path="/compliance" element={<ModelPage />} />
          <Route path="/providers" element={<PartnersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/property/:id" element=
            {
              <MarketPlaceDetailPage
              />
            } 
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </HomeLayout>
      </AllWalletsProvider>
    </HashRouter>
  );
};



export default App;
