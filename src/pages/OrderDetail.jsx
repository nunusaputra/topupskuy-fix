import React, { useEffect, useState } from "react";
import SideContent from "../components/order/SideContent";
import DetailContent from "../components/order/DetailContent";
import { dataList } from "../services";
import { useParams } from "react-router-dom";
import CoverHeader from "../components/order/CoverHeader";
import { FaArrowAltCircleUp } from "react-icons/fa";

const OrderDetail = () => {
  const { id } = useParams();
  const data = dataList.find((item) => item.id === parseInt(id));
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-10">
      <CoverHeader data={data} />
      <div className="container relative w-full mx-auto lg:flex lg:gap-10">
        <SideContent />
        <DetailContent />
      </div>

      <div
        className={`fixed flex items-center justify-center bottom-5 right-5 w-12 h-12 rounded-full bg-white ring-2 ring-orange-500 ring-offset-0 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 hover:cursor-pointer z-[100] ${
          showButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <FaArrowAltCircleUp className="w-full h-full text-orange-500" />
      </div>
    </div>
  );
};

export default OrderDetail;
