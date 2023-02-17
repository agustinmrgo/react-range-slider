import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getProgressWidth,
  getThumbPositionInTrack,
  getClosestDiscreteNumber,
} from "../../utils/helpers";

const getStepsPositions = (steps, trackWidth, min, max) => [
  ...steps.map((step) => getThumbPositionInTrack(step, trackWidth, min, max)),
];

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
  const [thumbsOffsets, setThumbsOffsets] = useState([0, 0]);
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
    //setear thumbsOffsets aca ?
  }, []);

  const startDragging = (e, thumbIndex) => {
    setIsDragging(true);
    const pointerX = e.clientX || e.changedTouches[0].clientX;
    const newThumbsOffsets = thumbsOffsets.map((thumbOffset, index) =>
      index === thumbIndex ? thumbs[index].offsetLeft - pointerX : thumbOffset
    );
    console.log("newThumbsOffsets", newThumbsOffsets);
    setThumbsOffsets(newThumbsOffsets);
  };

  const dragThumb = (event, index) => {
    if (event.target !== event.currentTarget && isDragging) {
      const thumbWidth = thumbs[index].current.firstChild.offsetWidth;
      const thumbX = event.clientX || event.touches[0].clientX;
      const trackOffset = track.current.getBoundingClientRect().left;
      const progressWidth = getProgressWidth(
        trackWidth,
        thumbX,
        trackOffset,
        thumbWidth
      ); // obtain new thumb position
      const newThumbPositions = [...thumbPositions];
      const stepsPositions = getStepsPositions(
        steps,
        trackWidth,
        minValue,
        maxValue
      );
      // console.log("stepsPositions", stepsPositions);
      // const closestDiscretePosition = getClosestDiscreteNumber(
      //   progressWidth,
      //   stepsPositions
      // );
      // newThumbPositions[index] = closestDiscretePosition;
      newThumbPositions[index] = progressWidth;
      // move setThumbPositions call to handleDragEnd function and validate there?
      setThumbPositions(newThumbPositions);
      onValueChange(
        newThumbPositions.map((position) =>
          getThumbValueInRange(position, trackWidth, minValue, maxValue)
        )
      );
    }
    // event.stopPropagation();
  };

  const stopDragging = (event, index) => {
    // if (event.target !== event.currentTarget) {
    if (isDragging) {
      setIsDragging(false);
      thumbs[index].current.removeEventListener("mousemove", dragThumb);
      thumbs[index].current.removeEventListener("touchmove", dragThumb);
      thumbs[index].current.removeEventListener("mouseup", (e) =>
        stopDragging(e, index)
      );
      thumbs[index].current.removeEventListener("touchend", () =>
        stopDragging(index)
      );
    }
    // }
    // event.stopPropagation();
  };

  return (
    <div
      ref={slider}
      className="range-slider"
      style={{ position: "relative", margin: "50px 0 30px", padding: "20px 0" }}
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
                position: "absolute",
                top: "-20px",
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
          style={{
            position: "absolute",
            top: "10px",
            left: `${position}px`,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#09f",
            cursor: "pointer",
          }}
          onMouseDown={(e, index) => startDragging(e, index)}
          onTouchStart={(e, index) => startDragging(e, index)}
          onMouseMove={(e) => dragThumb(e, index)}
          onMouseUp={(e) => stopDragging(e, index)}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#fff",
            }}
          />
        </div>
      ))}
    </div>
  );
};
