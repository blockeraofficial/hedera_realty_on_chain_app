import React, {useState} from "react";

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

const App = () => {

  const [walletInfo, setWalletInfo] = useState({
    publicKey: null,
    kit: null,
  });

  return (
    <HashRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <HomeLayout onConnect={setWalletInfo}>
        <Routes>
          <Route path="/" element={<MarketPlacePage/>} />
          <Route path="/dashboard" element=
            {
              <DashboardPage
                publicKey={walletInfo.publicKey}
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
                publicKey={walletInfo.publicKey}
                kit={walletInfo.kit}
              />
            } 
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </HomeLayout>
    </HashRouter>
  );
};



export default App;
