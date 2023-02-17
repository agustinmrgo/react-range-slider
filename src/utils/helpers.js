export const getThumbValueInRange = (
  thumbPosition,
  trackWidth,
  minValue,
  maxValue
) => {
  const valueRange = maxValue - minValue;
  const thumbRatio = thumbPosition / trackWidth;
  return Math.round(minValue + thumbRatio * valueRange);
};

export const getProgressWidth = (
  trackWidth,
  newThumbPosition,
  trackOffset,
  thumbWidth
) =>
  Math.max(
    0,
    Math.min(trackWidth, newThumbPosition - trackOffset - thumbWidth / 2)
  );

export const getThumbPositionInTrack = (value, trackWidth, min, max) => {
  const range = max - min;
  const ratio = (value - min) / range;
  const thumbPosition = ratio * trackWidth;
  return thumbPosition;
};

export const getClosestDiscreteNumber = (value, numbersArray) => {
  const min = numbersArray[0];
  const max = numbersArray[numbersArray.length - 1];

  if (value <= min) return min;

  if (value >= max) return max;

  const closest = numbersArray.reduce((a, b) => {
    return Math.abs(b - value) < Math.abs(a - value) ? b : a;
  });

  return closest;
};
