import React, { FC, ReactElement } from 'react';

const ButtonSubmit: FC<LayoutProps> = ({
  isLoading,
  isError,
  isSuccess,
  error,
  isLogin,
}: LayoutProps): ReactElement => {
  return (
    <button
      disabled={isLoading}
      type='submit'
      className={`w-full bg-green-600/90 hover:bg-green-600 ${
        isLoading ? 'bg-blue-600/90 hover:bg-blue-600' : ''
      } ${
        isError ? 'bg-red-600/90 hover:bg-red-600' : ''
      } rounded-md border-solid py-3 px-5 transition`}
    >
      <span className='mx-auto text-lg font-semibold text-white'>
        {!isLoading && !isError && !isSuccess
          ? isLogin
            ? 'Sign in'
            : 'Sign up'
          : !isError && isLoading
          ? isLogin
            ? 'Sign in Pending!'
            : 'Sign up Pending'
          : isError
          ? `${error ? error : 'Error At Sign UP'}`
          : isSuccess
          ? `${
              isLogin
                ? 'Logged! You will be redirected!'
                : 'Success! Please check your email to verify!'
            }`
          : null}
      </span>
    </button>
  );
};

export default ButtonSubmit;

interface LayoutProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | any;
  isLogin: boolean;
}
