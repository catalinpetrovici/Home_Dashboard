import React, { FC, ReactElement } from 'react';

type typeLabel = 'text' | 'email' | 'password' | 'number' | 'tel';

const LabelInput: FC<LayoutProps> = ({
  refLabel,
  textLabel,
  idLabel,
  typeLabel,
  placeholder,
  minLength,
}: LayoutProps): ReactElement => {
  return (
    <div>
      <label className="form-label" htmlFor={idLabel}>
        {textLabel}
      </label>
      <input
        className="input"
        ref={refLabel}
        type={typeLabel}
        placeholder={placeholder}
        autoComplete="on"
        id={idLabel}
        required={true}
        minLength={minLength}
      />
    </div>
  );
};

export default LabelInput;

interface LayoutProps {
  refLabel: React.RefObject<HTMLInputElement>;
  placeholder: string;
  textLabel: string;
  idLabel: string;
  typeLabel: typeLabel;
  minLength?: number;
}
