import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getThumbPositionInTrack,
  getClosestDiscreteNumber,
  getThumbMovingPosition,
  isNewThumbPositionValid,
} from "../../utils/helpers";

import "./discreteDoubleRangeSlider.css";

export const DiscreteDoubleRangeSlider = ({
  minValue = 0,
  maxValue = 100,
  steps,
  onValueChange,
}) => {
  const slider = useRef(null);
  const track = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = useRef(null);
  const thumbs = [useRef(null), useRef(null)];
  const [thumbPositions, setThumbPositions] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const initThumbPositions = [
      getThumbPositionInTrack(
        minValue,
        track.current.offsetWidth,
        minValue,
        maxValue
      ),
      getThumbPositionInTrack(
        maxValue,
        track.current.offsetWidth,
        minValue,
        maxValue
      ),
    ];
    setThumbPositions(initThumbPositions);
    setTrackWidth(track.current.offsetWidth);
  }, []);

  const startDragging = () => setIsDragging(true);

  const dragThumb = (e, index) => {
    if (isDragging) {
      const thumbWidth = thumbs[index].current.firstChild.offsetWidth;
      const newThumbPositions = [...thumbPositions];
      const thumbX = e.clientX || e.touches[0].clientX;
      const trackOffset = track.current.getBoundingClientRect().left;
      const newThumbPosition = getThumbMovingPosition(
        trackWidth,
        thumbX,
        trackOffset,
        thumbWidth
      ); // obtain new thumb position
      newThumbPositions[index] = newThumbPosition;
      if (
        isNewThumbPositionValid(newThumbPositions[index], index, thumbPositions)
      ) {
        setThumbPositions(newThumbPositions);
        onValueChange(
          newThumbPositions.map((position) =>
            getThumbValueInRange(position, trackWidth, minValue, maxValue)
          )
        );
      }
    }
  };

  const stopDragging = (e, index) => {
    if (isDragging) {
      setIsDragging(false);
      const thumbWidth = thumbs[index].current.firstChild.offsetWidth;
      const newThumbPositions = [...thumbPositions];
      const thumbX = e.clientX || e.touches[0].clientX;
      const trackOffset = track.current.getBoundingClientRect().left;
      const newThumbPosition = getThumbMovingPosition(
        trackWidth,
        thumbX,
        trackOffset,
        thumbWidth
      ); // obtain new thumb position
      newThumbPositions[index] = newThumbPosition;

      const newThumbValue = getThumbValueInRange(
        newThumbPosition,
        trackWidth,
        minValue,
        maxValue
      );
      const closestDiscreteValue = getClosestDiscreteNumber(newThumbValue, [
        minValue,
        ...steps,
        maxValue,
      ]);
      const closestDiscretePosition = getThumbPositionInTrack(
        closestDiscreteValue,
        trackWidth,
        minValue,
        maxValue
      );
      newThumbPositions[index] = closestDiscretePosition;

      setThumbPositions(newThumbPositions);
      onValueChange(
        newThumbPositions.map((position) =>
          getClosestDiscreteNumber(
            getThumbValueInRange(position, trackWidth, minValue, maxValue),
            [minValue, ...steps, maxValue]
          )
        )
      );
    }
  };

  return (
    <div ref={slider} className="range-slider">
      <div ref={track} className="slider-track">
        <div
          ref={progress}
          className="slider-progress"
          style={{
            height: "6px",
            backgroundColor: "#09f",
            width: `${thumbPositions[1] - thumbPositions[0]}px`,
            transform: `translateX(${thumbPositions[0]}px)`,
          }}
        />
        {steps &&
          steps.map((step, index) => (
            <div
              key={step}
              className="slider-mark"
              style={{
                left: `${getThumbPositionInTrack(
                  step,
                  trackWidth,
                  minValue,
                  maxValue
                )}px`,
              }}
            >
              {step}
            </div>
          ))}
      </div>

      {thumbPositions.map((position, index) => (
        <div
          ref={thumbs[index]}
          key={index}
          className="slider-thumb"
          style={{ left: `${position}px` }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
          onMouseMove={(e) => dragThumb(e, index)}
          onMouseUp={(e) => stopDragging(e, index)}
          onTouchEnd={(e) => stopDragging(e, index)}
        >
          <div />
        </div>
      ))}
    </div>
  );
};
