import { useState } from 'react';

type CheckBoxInput = {
  id: string;
  name: string;
  value: string | boolean;
  sendCommand: (e: any, id: string) => Promise<void>;
  className?: string;
};

function stringToBoolean(a: string) {
  return a === 'Off' ? false : a === 'On' ? true : false;
}
function booleanToString(a: boolean) {
  return a ? 'On' : 'Off';
}

const CheckBoxInput = ({
  id,
  name,
  value: val,
  className,
  sendCommand,
}: CheckBoxInput) => {
  const value = typeof val === 'string' ? stringToBoolean(val) : val;

  const [state, setCheckBox] = useState(value);

  const handleChange = (e: any) => {
    const { checked } = e.target;
    setCheckBox(checked);
    sendCommand(booleanToString(checked), id);
  };

  return (
    <section className='test'>
      <span className='mb-2 block text-[#ffffff72]'>{name}</span>
      <label className='switch'>
        <input
          type='checkbox'
          checked={state}
          onChange={(e) => handleChange(e)}
        />
        <span className='slider round'></span>
      </label>
    </section>
  );
};

export default CheckBoxInput;
