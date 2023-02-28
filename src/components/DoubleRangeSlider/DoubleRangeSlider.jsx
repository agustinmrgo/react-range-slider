import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getThumbMovingPosition,
  getThumbPositionInTrack,
  isNewThumbPositionValid,
} from "../../utils/helpers";

import "./doubleRangeSlider.css";

export const DoubleRangeSlider = ({ minValue, maxValue, onValueChange }) => {
  const slider = useRef(null);
  const thumbs = [useRef(null), useRef(null)];
  const progress = useRef(null);
  const track = useRef(null);
  const [thumbPositions, setThumbPositions] = useState([0, 0]);
  const [thumbValues, setThumbValues] = useState([minValue, maxValue]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const trackWidth = track.current.offsetWidth;
    const initThumbPositions = [
      getThumbPositionInTrack(minValue, trackWidth, minValue, maxValue),
      getThumbPositionInTrack(maxValue, trackWidth, minValue, maxValue),
    ];
    setThumbPositions(initThumbPositions);
  }, []);

  useEffect(() => {
    const trackWidth = track.current.offsetWidth;
    const newPositions = [
      getThumbPositionInTrack(thumbValues[0], trackWidth, minValue, maxValue),
      getThumbPositionInTrack(thumbValues[1], trackWidth, minValue, maxValue),
    ];
    setThumbPositions(newPositions);
    const newThumbValues = newPositions.map((position, index) => {
      const newThumbValue = getThumbValueInRange(
        position,
        track.current.offsetWidth,
        minValue,
        maxValue
      );
      if (index === 0 && newThumbValue < minValue) {
        return minValue;
      }
      if (index === 1 && newThumbValue > maxValue) {
        return maxValue;
      }
      return newThumbValue;
    });
    setThumbValues(newThumbValues);
    onValueChange(newThumbValues);
  }, [minValue, maxValue]);

  const dragThumb = (event, index) => {
    if (isDragging) {
      const trackWidth = track.current.offsetWidth;
      const thumbWidth = thumbs[index].current.firstChild.offsetWidth;
      const thumbX = event.clientX || event.touches[0].clientX;
      const trackOffset = track.current.getBoundingClientRect().left;
      const progressWidth = getThumbMovingPosition(
        trackWidth,
        thumbX,
        trackOffset,
        thumbWidth
      );
      const newThumbPositions = [...thumbPositions];
      newThumbPositions[index] = progressWidth;

      if (
        isNewThumbPositionValid(newThumbPositions[index], index, thumbPositions)
      ) {
        setThumbPositions(newThumbPositions);
        const newThumbValues = newThumbPositions.map((position) =>
          getThumbValueInRange(position, trackWidth, minValue, maxValue)
        );
        setThumbValues(newThumbValues);
        onValueChange(newThumbValues);
      }
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
          style={{
            width: `${thumbPositions[1] - thumbPositions[0]}px`,
            transform: `translateX(${thumbPositions[0]}px)`,
          }}
        />
      </div>
      {thumbPositions.map((position, index) => (
        <div
          ref={thumbs[index]}
          key={index}
          className="slider-thumb"
          style={{ left: `${position}px` }}
          onMouseDown={() => !isDragging && setIsDragging(true)}
          onTouchStart={() => !isDragging && setIsDragging(true)}
          onMouseMove={(e) => dragThumb(e, index)}
          onMouseUp={(e) => stopDragging(e, index)}
        >
          <div />
        </div>
      ))}
    </div>
  );
};
