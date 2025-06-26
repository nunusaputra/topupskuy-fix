import React, { useEffect } from "react";
import HeroBanner from "../components/landing-page/HeroBanner";
import Promo from "../components/landing-page/Promo";
import Popular from "../components/landing-page/Popular";
import MainContent from "../components/landing-page/MainContent";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";

const metadata = {
  colorTemplate: [
    {
      id: "AURORA_ANIMATION_COLOR_1",
      value_: "#005eff",
      notes: null,
      category: "color-template",
    },
    {
      id: "AURORA_ANIMATION_COLOR_2",
      value_: "#ffcc00",
      notes: null,
      category: "color-template",
    },
    {
      id: "AURORA_ANIMATION_COLOR_3",
      value_: "#38a9ff",
      notes: null,
      category: "color-template",
    },
    {
      id: "BACKGROUND_COLOR",
      value_: "#0a0a0a",
      notes: null,
      category: "color-template",
    },
    {
      id: "BACKGROUND_CONTENT_COLOR",
      value_: "#272730",
      notes: null,
      category: "color-template",
    },
    {
      id: "BORDER_COLOR_PRODUCT",
      value_: "#ffffff",
      notes: null,
      category: "color-template",
    },
    {
      id: "CARD_CONTENT_COLOR",
      value_: "#2b2b2b",
      notes: null,
      category: "color-template",
    },
    {
      id: "DOT_ANIMATION_COLOR",
      value_: "#a2ae4c",
      notes: null,
      category: "color-template",
    },
    {
      id: "HOVER_CARD_ALL_BUTTON_COLOR",
      value_: "#f5ec00",
      notes: null,
      category: "color-template",
    },
    {
      id: "LOGIN_REGISTER_COLOR",
      value_: "#ffffff",
      notes: null,
      category: "color-template",
    },
  ],
  banners: [
    {
      id: 1,
      isActive: true,
      asset: {
        id: 402,
        name: "temp14976251806973449729banner_fix-01 (1)",
        path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730426001/xkvu3zljobch1v2vxocw.webp",
        isDelete: false,
      },
    },
    {
      id: 2,
      isActive: true,
      asset: {
        id: 482,
        name: "temp6873976416419736645TOPUPSKUYY banner 2",
        path: "https://res.cloudinary.com/dkvaaxokv/image/upload/v1731040020/cvpktwbtrmdhpearl4hk.webp",
        isDelete: false,
      },
    },
  ],
  images: [
    {
      id: "",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "FAVICON",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "IMAGE_BANNER_1",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730426001/xkvu3zljobch1v2vxocw.webp",
      notes: null,
      category: "image",
    },
    {
      id: "IMAGE_BANNER_2",
      value_:
        "https://res.cloudinary.com/dkvaaxokv/image/upload/v1731040020/cvpktwbtrmdhpearl4hk.webp",
      notes: null,
      category: "image",
    },
    {
      id: "LOGO-FOOTER",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "LOGO-HEADER",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
  ],
  settings: [
    {
      id: "APPLICATION_NAME",
      value_: "Topupskuyy",
      notes: null,
      category: "settings",
    },
    {
      id: "FOOTER_ADDRESS",
      value_:
        "Kp. Rawa Bebek no.19 RT.001 RW.011 Kelurahan Kota Baru, Kecamatan Bekasi Barat, Kode Pos 17133",
      notes: null,
      category: "settings",
    },
    {
      id: "FOOTER_EMAIL",
      value_: "topupskuyy.info@gmail.com",
      notes: null,
      category: "settings",
    },
  ],
  socialMedias: [
    {
      id: 4,
      name: "Instagram",
      link: "https://www.instagram.com/topupskuyy_id/",
      logo: "bi bi-instagram",
    },
  ],
};

const LandingPage = () => {
  // const { data: metadata, isLoading } = useQuery({
  //   queryKey: ["metadata"],
  //   queryFn: fetchMetadata,
  // });

  const isLoading = false;

  return (
    <div>
      <HeroBanner metadata={metadata?.banners} isLoading={isLoading} />
      <div className="container relative">
        {/* <Promo />
        <Popular /> */}
        <MainContent token={metadata?.crack} />
      </div>
    </div>
  );
};

export default LandingPage;
