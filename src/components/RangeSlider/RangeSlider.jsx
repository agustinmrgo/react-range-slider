import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getThumbPositionInTrack,
  getThumbMovingPosition,
} from "../../utils/helpers";

export const RangeSlider = ({ minValue, maxValue, onValueChange }) => {
  const slider = useRef(null);
  const track = useRef(null);
  const thumb = useRef(null);
  const progress = useRef(null);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const initThumbPosition = getThumbPositionInTrack(
      minValue,
      track.current.offsetWidth,
      minValue,
      maxValue
    );
    setThumbPosition(initThumbPosition);
  }, []);

  const startDragging = () => setIsDragging(true);

  const dragThumb = (event) => {
    if (isDragging) {
      const trackWidth = track.current.offsetWidth;
      const thumbWidth = thumb.current.firstChild.offsetWidth;
      const thumbX = event.clientX || event.touches[0].clientX;
      const trackOffset = track.current.getBoundingClientRect().left;
      const newThumbPosition = getThumbMovingPosition(
        trackWidth,
        thumbX,
        trackOffset,
        thumbWidth
      );
      onValueChange(
        getThumbValueInRange(newThumbPosition, trackWidth, minValue, maxValue)
      );
      setThumbPosition(newThumbPosition);
    }
  };

  const stopDragging = () => {
    if (isDragging) setIsDragging(false);
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
        onMouseMove={dragThumb}
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
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
