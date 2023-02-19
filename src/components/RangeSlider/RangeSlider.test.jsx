import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RangeSlider } from "./RangeSlider";

describe("RangeSlider", () => {
  test.only("renders correctly with default props", () => {
    const { container } = render(<RangeSlider />);
    const slider = container.querySelector(".range-slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveStyle("position: relative");
  });

  test("changes value when dragged", () => {
    const onValueChange = jest.fn();
    const { container } = render(
      <RangeSlider minValue={0} maxValue={100} onValueChange={onValueChange} />
    );
    const thumb = container.querySelector(".slider-thumb");
    const track = container.querySelector(".slider-track");
    const trackWidth = track.offsetWidth;
    const thumbWidth = thumb.firstChild.offsetWidth;
    const trackOffset = track.getBoundingClientRect().left;
    const thumbX = trackOffset + thumbWidth / 2 + trackWidth / 2;
    fireEvent.mouseDown(thumb, { clientX: thumbX });
    fireEvent.mouseMove(thumb, { clientX: thumbX - 10 });
    expect(onValueChange).toHaveBeenCalledWith(90);
  });

  test("changes value when props change", () => {
    const onValueChange = jest.fn();
    const { rerender } = render(
      <RangeSlider minValue={0} maxValue={100} onValueChange={onValueChange} />
    );
    rerender(
      <RangeSlider minValue={0} maxValue={50} onValueChange={onValueChange} />
    );
    expect(onValueChange).toHaveBeenCalledWith(25);
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

  test("has correct accessibility attributes", () => {
    const { container } = render(
      <RangeSlider minValue={0} maxValue={100} onValueChange={() => {}} />
    );
    const slider = container.querySelector(".range-slider");
    expect(slider).toHaveAttribute("role", "slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });
});
