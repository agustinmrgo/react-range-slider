import React, { useState, useRef } from "react";
import { getThumbValueInRange } from "../../utils/helpers";

export const RangeSlider = ({ minValue, maxValue, onValueChange }) => {
  const [thumbPosition, setThumbPosition] = useState(0);
  const slider = useRef(null);
  const thumb = useRef(null);
  const progress = useRef(null);
  const track = useRef(null);

  const startDragging = (event) => {
    event.preventDefault();
    document.addEventListener("mousemove", dragThumb);
    document.addEventListener("touchmove", dragThumb);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
  };

  const dragThumb = (event) => {
    const trackWidth = track.current.offsetWidth;
    const thumbWidth = thumb.current.firstChild.offsetWidth;
    const thumbX = event.clientX || event.touches[0].clientX;
    const trackOffset = track.current.getBoundingClientRect().left;
    const progressWidth = Math.max(
      0,
      Math.min(trackWidth, thumbX - trackOffset - thumbWidth / 2)
    );
    onValueChange(
      getThumbValueInRange(progressWidth, trackWidth, minValue, maxValue)
    );
    setThumbPosition(progressWidth);
  };

  const stopDragging = () => {
    document.removeEventListener("mousemove", dragThumb);
    document.removeEventListener("touchmove", dragThumb);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchend", stopDragging);
  };

  return (
    <div
      ref={slider}
      className="range-slider"
      style={{ position: "relative", margin: "50px 0 30px" }}
    >
      <div
        ref={track}
        className="slider-track"
        style={{ height: "6px", backgroundColor: "#ccc" }}
      >
        <div
          ref={progress}
          className="slider-progress"
          style={{
            height: "6px",
            backgroundColor: "#09f",
            width: `${thumbPosition}px`,
          }}
        />
      </div>
      <div
        ref={thumb}
        className="slider-thumb"
        style={{
          position: "absolute",
          top: "-14px",
          left: `${thumbPosition}px`,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#09f",
          cursor: "pointer",
        }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        />
      </div>
    </div>
  );
};
