import React, { useRef } from 'react';
import LabelInput from '../components/Auth/InputLabel';
import PasswordLabelInput from '../components/Auth/PasswordInputLabel';
import ButtonSubmit from '../components/Auth/ButtonSubmit';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosIns from '../utils/axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // @ts-ignore
  const checkBoxRef = useRef<HTMLInputElement>(false);

  async function registerUser(object: object) {
    try {
      const { data } = await axiosIns.post('/api/v1/auth/login', object);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2 * 1000);
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) throw error.response.data.message;
      }
      throw error.message;
    } finally {
    }
  }

  const { isLoading, isSuccess, isError, error, mutateAsync, data } =
    useMutation({
      mutationFn: registerUser,
    });

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      const userInput = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        keepMe: checkBoxRef.current.checked,
      };

      mutateAsync({ ...userInput });
    }
  }

  return (
    <section className='text-white'>
      <div className='mx-auto my-auto w-full max-w-lg py-8 '>
        <h1 className='mb-3 text-3xl font-bold tracking-tight'>Log in</h1>
        <form className='mt-10 space-y-6' method='POST' onSubmit={submitForm}>
          <div className='space-y-5'>
            <LabelInput
              placeholder='e.g. catalin@gmail.com'
              typeLabel='email'
              idLabel='email'
              textLabel='Email'
              refLabel={emailRef}
            />
            <PasswordLabelInput refLabel={passwordRef} />
          </div>
          <div className='text-tiny flex flex-col justify-between smallScreen:flex-row smallScreen:items-center'>
            <div className='mb-2 flex items-center smallScreen:mb-0'>
              <input
                type='checkbox'
                name='remember'
                id='remember-me'
                className='accent-green-600'
                ref={checkBoxRef}
              />
              <label className='ml-2 block' htmlFor='remember-me'>
                {' '}
                Keep me signed in{' '}
              </label>
            </div>
            <p>
              <Link className='hover:underline' to='forgot-password'>
                Forgot your password?
              </Link>
            </p>
          </div>
          <ButtonSubmit
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            error={error}
            isLogin={true}
          />
        </form>
        <div className='mt-5 text-center'>
          <p className='opacity-75'>
            Don&apos;t have an account yet?{' '}
            <Link className='underline hover:opacity-75' to='/register'>
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
