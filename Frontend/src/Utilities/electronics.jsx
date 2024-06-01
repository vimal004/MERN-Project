import React, { useState, useEffect } from "react";
import Card from "./card1";
import electronicsData from "./data";
import ShimmerCard from "./shimmercard";

const Electronics = () => {
  const [shimmer, setShimmer] = useState(true);
  const data = electronicsData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShimmer(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-center text-3xl font-bold mt-7 mb-4">Electronics</h1>
      <div className="flex-grow flex flex-wrap justify-center items-center gap-6 p-2 relative">
        <div
          className={`absolute inset-x-0 top-6 flex flex-wrap justify-center items-center gap-6 p-2 transition-opacity duration-500 ${
            shimmer ? "opacity-100" : "opacity-0"
          }`}
        >
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
        <div
          className={`transition-opacity duration-500 ${
            shimmer ? "opacity-0" : "opacity-100"
          } flex flex-wrap justify-center items-center gap-6 p-2`}
        >
          {data.map((d) => (
            <Card
              key={d.product_name}
              name={d.product_name}
              rating={d.rating}
              price={d.price}
              imageLink={d.image_link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;

