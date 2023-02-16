import React, { useState } from "react";

import { RangeSlider } from "../components/RangeSlider/RangeSlider";
import { DoubleRangeSlider } from "../components/DoubleRangeSlider/DoubleRangeSlider";

const initRange = [30, 85];

export default function Excercise1() {
  const [price, setPrice] = useState(0);
  const [priceRange, setPriceRange] = useState(initRange);

  const handlePriceChange = (newPrice) => setPrice(newPrice);
  const handlePriceRangeChange = (newPriceRange) =>
    setPriceRange(newPriceRange);

  return (
    <>
      <h1>React range slider</h1>
      <h2>Excercise 1</h2>
      <div style={{ margin: 50 }}>
        <RangeSlider
          minValue={0}
          maxValue={100}
          onValueChange={handlePriceChange}
        />
        <p>${price} </p>
        <DoubleRangeSlider
          minValue={30}
          maxValue={85}
          onValueChange={handlePriceRangeChange}
        />
        <p>
          {priceRange.map((price, index) => (
            <span key={index} style={{ margin: "0 15px" }}>
              ${price}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
