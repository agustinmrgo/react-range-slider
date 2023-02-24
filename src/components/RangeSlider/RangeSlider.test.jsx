import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RangeSlider } from "./RangeSlider";
import "@testing-library/jest-dom";

import { getThumbValueInRange } from "../../utils/helpers";

describe("RangeSlider", () => {
  test("renders correctly with default props", () => {
    const { container } = render(<RangeSlider />);
    const slider = container.querySelector(".range-slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveStyle("position: relative");
  });

  test("changes value when dragged", () => {
    const onValueChangeMock = jest.fn();
    const { container } = render(
      <RangeSlider
        minValue={0}
        maxValue={100}
        onValueChange={onValueChangeMock}
      />
    );
    const thumb = container.querySelector(".slider-thumb");
    const track = container.querySelector(".slider-track");
    const trackWidth = track.offsetWidth;
    const thumbWidth = thumb.firstChild.offsetWidth;
    const trackOffset = track.getBoundingClientRect().left;
    const thumbX = trackOffset + thumbWidth / 2 + trackWidth / 2;
    fireEvent.mouseDown(thumb, { clientX: thumbX });
    fireEvent.mouseMove(thumb, { clientX: thumbX + 10 });
    const expectedValue = getThumbValueInRange(
      thumbX - trackOffset - thumbWidth / 2,
      trackWidth,
      0,
      100
    );
    expect(onValueChangeMock).toHaveBeenCalledWith(expectedValue);
  });

  test.only("sets max value when dragged outside track", () => {
    const onValueChangeMock = jest.fn();
    const maxValue = 100;
    const { container } = render(
      <RangeSlider
        minValue={0}
        maxValue={maxValue}
        onValueChange={onValueChangeMock}
      />
    );
    const thumb = container.querySelector(".slider-thumb");
    const track = container.querySelector(".slider-track");
    const trackWidth = track.offsetWidth;
    const thumbWidth = thumb.firstChild.offsetWidth;
    console.log(
      "🚀 ~ file: RangeSlider.test.jsx:56 ~ test.only ~ thumbWidth:",
      thumbWidth
    );
    const trackOffset = track.getBoundingClientRect().left;
    console.log(
      "🚀 ~ file: RangeSlider.test.jsx:57 ~ test.only ~ trackOffset:",
      trackOffset
    );
    const thumbX = trackOffset + thumbWidth / 2 + trackWidth / 2;
    console.log(
      "🚀 ~ file: RangeSlider.test.jsx:58 ~ test.only ~ thumbX:",
      thumbX
    );
    fireEvent.mouseDown(thumb, { clientX: thumbX });
    fireEvent.mouseMove(thumb, { clientX: thumbX + trackWidth + 10 });
    const expectedValue = getThumbValueInRange(
      thumbX - trackOffset - thumbWidth / 2,
      trackWidth,
      0,
      100
    );
    console.log(
      "🚀 ~ file: RangeSlider.test.jsx:66 ~ test.only ~ expectedValue:",
      expectedValue
    );
    expect(onValueChangeMock).toHaveBeenCalledWith(expectedValue);
  });

  test("calls callback function when value changes", () => {
    const onValueChange = jest.fn();
    const { container } = render(
      <RangeSlider minValue={0} maxValue={100} onValueChange={onValueChange} />
    );
    const thumb = container.querySelector(".slider-thumb");
    fireEvent.mouseDown(thumb);
    fireEvent.mouseMove(thumb, { clientX: 50 });
    fireEvent.mouseUp(thumb);
    expect(onValueChange).toHaveBeenCalled();
  });
});
