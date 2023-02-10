import React, { FC, ReactElement, useState } from 'react';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

const PasswordInputLabel: FC<LayoutProps> = ({
  refLabel,
}: LayoutProps): ReactElement => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  function toggleIsVisiblePassword(e: React.MouseEvent) {
    e.preventDefault();
    setIsVisiblePassword((prevValue) => !prevValue);
  }

  return (
    <div>
      <label className="form-label" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <button
          className="absolute top-3 right-3 h-6 w-6 flex justify-center hover:bg-gray-300 rounded transition"
          onClick={toggleIsVisiblePassword}
        >
          {isVisiblePassword ? (
            <ImEye className="self-center" />
          ) : (
            <ImEyeBlocked className="self-center" />
          )}
        </button>
        <input
          ref={refLabel}
          type={isVisiblePassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="on"
          id="password"
          required={true}
          minLength={8}
          className="input"
        />
      </div>
    </div>
  );
};

export default PasswordInputLabel;

interface LayoutProps {
  refLabel: React.RefObject<HTMLInputElement>;
}
