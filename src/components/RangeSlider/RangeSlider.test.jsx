import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RangeSlider } from "./RangeSlider";
import "@testing-library/jest-dom";

import { getThumbValueInRange } from "../../utils/helpers";
import { assert } from "console";

describe("RangeSlider", () => {
  test("renders correctly with default props", () => {
    const { container } = render(<RangeSlider />);
    const slider = container.querySelector(".range-slider");
    expect(slider).toBeInTheDocument();
  });

  test("calls handler when dragged", () => {
    const onValueChangeMock = jest.fn();
    const { container } = render(
      <RangeSlider
        minValue={0}
        maxValue={100}
        onValueChange={onValueChangeMock}
      />
    );
    const thumb = container.querySelector(".slider-thumb");

    fireEvent.mouseDown(thumb, { clientX: 10 });
    fireEvent.mouseMove(thumb, { clientX: 10 + 10 });
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
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
    jest.spyOn(track, "offsetWidth", "get").mockImplementation(() => 200);
    jest.spyOn(track, "getBoundingClientRect").mockImplementation(() => ({
      left: 10,
    }));
    jest
      .spyOn(thumb.firstChild, "offsetWidth", "get")
      .mockImplementation(() => 32);
    const trackWidth = track.offsetWidth;
    const thumbWidth = thumb.firstChild.offsetWidth;
    const trackOffset = track.getBoundingClientRect().left;
    const thumbX = trackOffset + thumbWidth / 2 + trackWidth / 2;

    fireEvent.mouseDown(thumb, { clientX: thumbX });
    fireEvent.mouseMove(thumb, { clientX: thumbX + trackWidth / 2 });
    fireEvent.mouseUp(thumb, { clientX: thumbX + trackWidth / 2 });
    expect(onValueChangeMock).toHaveBeenCalledWith(100);
  });
});
