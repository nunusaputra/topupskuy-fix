import React from "react";
import HeroBanner from "../components/landing-page/HeroBanner";
import Promo from "../components/landing-page/Promo";
import Popular from "../components/landing-page/Popular";
import MainContent from "../components/landing-page/MainContent";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";

const LandingPage = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 21600000, 
  });

  console.log(metadata)

  return (
    <div>
      <HeroBanner metadata={metadata?.images} />

      <div className="container relative">
        {/* <Promo />
        <Popular /> */}
        <MainContent token={metadata?.crack} />
      </div>
    </div>
  );
};

export default LandingPage;
