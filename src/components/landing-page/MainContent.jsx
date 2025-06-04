import React, { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../services";

import { useQuery } from "@tanstack/react-query";

const MainContent = () => {
  const [visibleCounts, setVisibleCounts] = useState(10);
  const [searchKeywords, setSearchKeywords] = useState("");
  const sectionRef = useRef({});

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
    desc: 20,
  });

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 360 && window.innerWidth < 500) {
        setSize({
          min: 15,
          max: 12,
          desc: 15,
        });
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        setSize({
          min: 15,
          max: 13,
        });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setSize({
          min: 15,
          max: 15,
        });
      } else if (window.innerWidth >= 1280) {
        setSize({
          min: 20,
          max: 18,
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
    <div className="w-full p-4 md:px-8 md:py-6 bg-secondary_opacity backdrop-blur-4xl rounded-xl flex flex-col gap-20 mb-[10rem]">
      {/* Button navigate */}
      <div className="flex flex-wrap gap-4">
        {product?.categories.map((category) => (
          <button
            className="bg-third px-4 py-2 rounded-md font-semibold "
            key={category.id}
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
                  <i className="bi bi-controller text-2xl md:text-3xl text-purple-300 mt-[0.1rem]" />
                  <h1 className="text-lg md:text-2xl text-white font-semibold mb-2">
                    {category.name}
                  </h1>
                </div>
                {category.id === 1 && (
                  <label
                    htmlFor=""
                    className="relative block w-full sm:w-[50%] lg:w-[30%]"
                  >
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
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-7">
                {displayedProducts.map((item) => (
                  <a href={`/order/${item.slug}`} key={item.slug}>
                    <div className="w-[100%] h-[12.5] md:h-[16.5rem] flex flex-col bg-[#060911] rounded-lg ring-2 ring-purple-500 ring-offset-0 transition-all duration-300 hover:ring-offset-8 hover:rotate-3 hover:ring-offset-secondary hover:cursor-pointer overflow-hidden">
                      <div className="w-full h-[8.8rem] md:h-[12.5rem] bg-white">
                        <img
                          src={item.logo.path}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full h-16 bg-sixth/20 px-2 py-1 flex flex-col">
                        <h1 className="text-white text-sm sm:text-lg font-bold">
                          {item.title.length > size.desc
                            ? `${item.title.substring(0, size.desc)}...`
                            : item.title}
                        </h1>
                        <h1 className="text-white text-sm">
                          {item.sub_title.length > size.desc
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
