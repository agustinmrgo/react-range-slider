import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getThumbPositionInTrack,
  getThumbMovingPosition,
} from "../../utils/helpers";

import "./rangeSlider.css";

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
    <div ref={slider} className="range-slider">
      <div ref={track} className="slider-track">
        <div
          ref={progress}
          className="slider-progress"
          style={{ width: `${thumbPosition}px` }}
        />
      </div>
      <div
        ref={thumb}
        className="slider-thumb"
        style={{ left: `${thumbPosition}px` }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
        onMouseMove={dragThumb}
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
      >
        <div />
      </div>
    </div>
  );
};
