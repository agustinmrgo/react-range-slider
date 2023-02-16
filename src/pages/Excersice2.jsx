import React, { useState } from "react";

import { DiscreteRangeSlider } from "../components/DiscreteRangeSlider/DIscreteRangeSlider";

export default function Excercise2() {
  const [price, setPrice] = useState(0);
  const handlePriceChange = (newPrice) => setPrice(newPrice);
  return (
    <>
      <h1>React range slider</h1>
      <h2>Excercise 2</h2>
      <div style={{ margin: "0 50px" }}>
        <DiscreteRangeSlider
          minValue={0}
          maxValue={100}
          steps={[20, 40, 60, 80]}
          onValueChange={handlePriceChange}
        />
      </div>
      <p>${price}</p>
    </>
  );
}
