import { FC } from 'react';

type Props = {
  apiResultLength: number;
  setapiResultLength: (value: number) => void;
};

const RangeSlider: FC<Props> = ({ apiResultLength, setapiResultLength }) => {
  return (
    <label className="graph-slider">
      Amount of data to display
      <input
        type="range"
        min={10}
        step={10}
        max={200}
        value={apiResultLength}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setapiResultLength(Number(target.value));
        }}
      />
    </label>
  );
};

export default RangeSlider;
