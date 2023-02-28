import React, { useState } from "react";

import { RangeSlider } from "../components/RangeSlider/RangeSlider";
import { DoubleRangeSlider } from "../components/DoubleRangeSlider/DoubleRangeSlider";

const initRange = [30, 85];

export default function Excercise1() {
  const [price, setPrice] = useState(0);
  const [minValue, setMinValue] = useState(initRange[0]);
  const [maxValue, setMaxValue] = useState(initRange[1]);
  const [priceRange, setPriceRange] = useState(initRange);

  const handlePriceChange = (newPrice) => setPrice(newPrice);
  const handlePriceRangeChange = (newPriceRange) =>
    setPriceRange(newPriceRange);

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === "minValue") {
      setMinValue(Number(value));
    }
    if (name === "maxValue") {
      setMaxValue(Number(value));
    }
  };

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
        <p>$ {price}</p>
        <DoubleRangeSlider
          minValue={minValue}
          maxValue={maxValue}
          onValueChange={handlePriceRangeChange}
        />
        <input
          name="minValue"
          type="number"
          style={{ width: 40, margin: "0 15px" }}
          onChange={handleInputChange}
          value={minValue}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <input
          name="maxValue"
          type="number"
          style={{ width: 40, margin: "0 15px" }}
          onChange={handleInputChange}
          value={maxValue}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <p>
          {priceRange.map((price, index) => (
            <span key={index} style={{ margin: "0 15px" }}>
              $ {price}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
