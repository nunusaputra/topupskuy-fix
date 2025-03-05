import React from "react";
import HeroBanner from "../components/landing-page/HeroBanner";
import Promo from "../components/landing-page/Promo";
import Popular from "../components/landing-page/Popular";
import MainContent from "../components/landing-page/MainContent";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      <div className="container relative">
        {/* Promo Content */}
        <Promo />
        {/* Popular Topup */}
        <Popular />
        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  );
};

export default LandingPage;
