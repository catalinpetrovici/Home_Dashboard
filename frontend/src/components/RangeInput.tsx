import { useState } from 'react';

type RangeInput = {
  id: string;
  name: string;
  value: number;
  setupRange: { step: number; min: number; max: number };
  className?: string;
  sendCommand: (e: any, id: string) => Promise<void>;
};

const RangeInput = ({
  id,
  name,
  value,
  setupRange,
  className,
  sendCommand,
}: RangeInput) => {
  const [state, setSlide] = useState(value);

  const handleChange = (e: any) => {
    setSlide(e.target.value);
  };

  const handleChangeMouseUp = (e: any) => {
    sendCommand(state, id);
  };

  return (
    <section className='test mt-2'>
      <span className='mb-2 block text-[#ffffff72]'>{name}</span>
      <input
        type='range'
        value={state}
        min={setupRange.min}
        max={setupRange.max}
        step={setupRange.step}
        onChange={(e) => handleChange(e)}
        className={className}
        onMouseUp={handleChangeMouseUp} // only set state when handle is released
      />
    </section>
  );
};

export default RangeInput;
