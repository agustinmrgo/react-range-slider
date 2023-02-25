import React, { useState, useRef, useEffect } from "react";
import {
  getThumbValueInRange,
  getThumbMovingPosition,
  getThumbPositionInTrack,
} from "../../utils/helpers";

export const DoubleRangeSlider = ({ minValue, maxValue, onValueChange }) => {
  const slider = useRef(null);
  const thumbs = [useRef(null), useRef(null)];
  const progress = useRef(null);
  const track = useRef(null);
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
  }, []);

  const dragThumb = (event, index) => {
    if (event.target !== event.currentTarget && isDragging) {
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
      // move setThumbPositions call to handleDragEnd function and validate there?
      setThumbPositions(newThumbPositions);
      onValueChange(
        newThumbPositions.map((position) =>
          getThumbValueInRange(position, trackWidth, minValue, maxValue)
        )
      );
    }
  };

  const stopDragging = (event, index) => {
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
          onMouseDown={() => !isDragging && setIsDragging(true)}
          onTouchStart={() => !isDragging && setIsDragging(true)}
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
