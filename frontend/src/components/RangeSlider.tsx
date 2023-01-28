import { useQuery, useMutation } from '@tanstack/react-query';

type RangeSlider = {
  stepRange: number;
  minRange: number;
  maxRange: number;
  className: string;
  valueRange: number;
  handleRangeChange: (event: any) => void;
};
const RangeSlider = ({
  stepRange,
  minRange,
  maxRange,
  className,
  valueRange,
  handleRangeChange,
}: RangeSlider) => {
  return (
    <input
      type='range'
      value={valueRange}
      min={minRange}
      max={maxRange}
      step={stepRange}
      onChange={handleRangeChange}
      className={className}
    />
  );
};

export default RangeSlider;
