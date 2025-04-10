import React, { useEffect } from "react";
import HeroBanner from "../components/landing-page/HeroBanner";
import Promo from "../components/landing-page/Promo";
import Popular from "../components/landing-page/Popular";
import MainContent from "../components/landing-page/MainContent";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";

const LandingPage = () => {
  const { data: metadata } = useQuery({
      queryKey: ["metadata"],
      queryFn: fetchMetadata
    });
  
    useEffect(() => {
      if (metadata?.settings[0].value_) {
        console.log("im accessing metadata title", metadata?.settings[0].value_)
  
        document.title = metadata?.settings[0].value_;
      }
  
      if (metadata?.images[1].value_) {
        console.log("im accessing metadata image logo favicon", metadata?.images[1].value_)
  
        const link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");
        link.rel = "icon";
        link.href = metadata?.images[1].value_;
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    }, []);

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
