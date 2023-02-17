import React, { useState } from "react";

import { DiscreteDoubleRangeSlider } from "../components/DiscreteDoubleRangeSlider/DiscreteDoubleRangeSlider";

const initRange = [0, 100];

export default function Excercise2() {
  const [priceRange, setPriceRange] = useState(initRange);
  const handlePriceRangeChange = (newPriceRange) =>
    setPriceRange(newPriceRange);
  return (
    <>
      <h1>React range slider</h1>
      <h2>Excercise 2</h2>
      <div style={{ margin: "0 50px" }}>
        <DiscreteDoubleRangeSlider
          minValue={0}
          maxValue={100}
          steps={[20, 40, 60, 80]}
          onValueChange={handlePriceRangeChange}
        />
      </div>
      <p>
        {priceRange.map((price, index) => (
          <span key={index} style={{ margin: "0 15px" }}>
            $ {price}
          </span>
        ))}
      </p>
    </>
  );
}
