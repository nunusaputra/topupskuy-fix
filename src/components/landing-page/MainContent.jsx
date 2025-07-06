import React, { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../services";

import { useQuery } from "@tanstack/react-query";

const MainContent = () => {
  const [visibleCounts, setVisibleCounts] = useState(10);
  const [searchKeywords, setSearchKeywords] = useState("");
  const sectionRef = useRef({});
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const handleShowMore = (categoryId) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 10) + 10,
    }));
  };

  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
    staleTime: 21600000,
  });

  const [size, setSize] = useState({
    min: 0,
    max: 0,
    desc: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 360 && window.innerWidth < 500) {
        setSize({
          min: 15,
          max: 13,
          desc: 13,
        });
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        setSize({
          min: 15,
          max: 15,
          desc: 15,
        });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setSize({
          min: 15,
          max: 18,
          desc: 18,
        });
      } else if (window.innerWidth >= 1280) {
        setSize({
          min: 27,
          max: 27,
          desc: 27,
        });
      } else {
        setSize({
          min: 12,
          max: 10,
          desc: 15,
        });
      }
    };

    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div className="w-full p-4 md:px-8 md:py-6 bg-secondary_opacity backdrop-blur-4xl rounded-xl flex flex-col gap-20 mb-[3rem]">
      {/* Button navigate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 relative">
          {/* Tombol Panah Kiri */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow sm:hidden"
          >
            <i className="bi bi-chevron-left" />
          </button>

          {/* Container Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide px-10 sm:px-0"
          >
            {product?.categories.map((category) => (
              <button
                key={category.id}
                className="bg-third px-4 py-2 rounded-md font-semibold text-xs sm:text-sm shrink-0"
                onClick={() =>
                  sectionRef.current[category.id]?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Tombol Panah Kanan */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow sm:hidden"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
        <label htmlFor="" className="relative block w-full">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <i className="bi bi-search w-5 h-5"></i>
          </span>
          <input
            type="text"
            name="search"
            placeholder="Search for anything..."
            onChange={(e) => setSearchKeywords(e.target.value)}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-border_color rounded-md py-2 pl-9 pr-3 shadow-custom focus:outline-none sm:text-sm"
          />
        </label>
      </div>

      {product?.categories
        .filter((x) => x.active === true)
        .map((category) => {
          let filteredProducts = [];
          if (searchKeywords !== "") {
            let value = searchKeywords.toLowerCase();
            filteredProducts =
              product?.myProducts.filter(
                (item) =>
                  item.category.name === category.name &&
                  item.active === true &&
                  item.title.toLowerCase().includes(value)
              ) || [];
          } else {
            filteredProducts =
              product?.myProducts.filter(
                (item) =>
                  item.category.name === category.name && item.active === true
              ) || [];
          }

          const sortedProducts = filteredProducts.sort(
            (a, b) => a.position - b.position
          );

          const visibleCount = visibleCounts[category.id] || 10;
          const displayedProducts = sortedProducts.slice(0, visibleCount);

          return (
            <div
              key={category.id}
              className="flex flex-col gap-5"
              ref={(el) => (sectionRef.current[category.id] = el)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
                <div className="flex gap-2">
                  {category.name === "Game Populer" && (
                    <i className="bi bi-controller text-2xl md:text-3xl text-purple-300 mt-[0.1rem]" />
                  )}
                  {category.name === "Voucher & E-Wallet" && (
                    <i className="bi bi-wallet2 text-2xl md:text-3xl text-purple-300 mt-[0.1rem]" />
                  )}
                  {category.name === "Pulsa & PLN" && (
                    <i className="bi bi-lightning-fill text-2xl md:text-3xl text-purple-300 mt-[0.1rem]" />
                  )}
                  <h1 className="text-lg md:text-2xl text-white font-semibold mb-2">
                    {category.name}
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-7">
                {displayedProducts.map((item) => (
                  <a href={`/order/${item.slug}`} key={item.slug}>
                    <div className="w-[100%] h-[9rem] md:h-[16.5rem] flex flex-col bg-[#060911] rounded-lg ring-2 ring-border_color ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:rotate-3 hover:ring-offset-secondary hover:cursor-pointer overflow-hidden">
                      <div className="w-full h-[8.8rem] md:h-[12.5rem] bg-white">
                        <img
                          src={item.logo.path}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full h-16 bg-sixth/20 px-2 py-1 flex flex-col">
                        <h1 className="text-white text-zs sm:text-sm font-bold">
                          {item.title.length > size.min
                            ? `${item.title.substring(0, size.desc)}...`
                            : item.title}
                        </h1>
                        <h1 className="text-white text-zs sm:text-sm">
                          {item.sub_title.length > size.min
                            ? `${item.sub_title.substring(0, size.desc)}...`
                            : `${item.sub_title}`}
                        </h1>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {sortedProducts.length > visibleCount && (
                <div className="mt-5 flex items-center justify-center">
                  <div className="mt-5 flex items-center justify-center">
                    <button
                      className="px-4 py-2 rounded-md bg-transparent border-2 border-border_color text-border_color font-semibold cursor-pointer"
                      onClick={() => handleShowMore(category.id)}
                    >
                      Show More
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default MainContent;
