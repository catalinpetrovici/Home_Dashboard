import React, { useRef } from 'react';
import LabelInput from '../components/Auth/InputLabel';
import PasswordLabelInput from '../components/Auth/PasswordInputLabel';
import ButtonSubmit from '../components/Auth/ButtonSubmit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import axiosIns from '../utils/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

async function registerUser(object: object) {
  try {
    await axiosIns.post('/api/v1/auth/register', object);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) throw error.response.data.message;
    }
    throw error.message;
  }
}

const Register = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { isLoading, isSuccess, isError, error, mutate } =
    useMutation(registerUser);

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (
      emailRef.current !== null &&
      passwordRef.current !== null &&
      phoneNumberRef.current !== null &&
      fullNameRef.current !== null &&
      fullNameRef.current !== null
    ) {
      const [firstName, ...lastNames] = fullNameRef.current.value.split(' ');

      const lastName = lastNames.join(' ');

      const userInput = {
        email: emailRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        password: passwordRef.current.value,
        firstName,
        lastName,
      };

      console.log(userInput);

      mutate(userInput);
    }
  }

  return (
    <section className='mx-auto max-w-lg text-white'>
      <h1 className='py-8 text-3xl font-bold tracking-tight'>Sign up</h1>
      <div className='mt-1'>
        <p className='opacity-75'>
          Already have an account?{' '}
          <Link className='underline hover:opacity-75' to='/login'>
            Log in.
          </Link>
        </p>
      </div>
      <form className='mt-10 space-y-6' onSubmit={submitForm}>
        <div className='space-y-3'>
          <LabelInput
            placeholder='Catalin Cristian Petrovici'
            typeLabel='text'
            idLabel='fullName'
            textLabel='Full Name'
            refLabel={fullNameRef}
          />
          <LabelInput
            placeholder='e.g. catalin@gmail.com'
            typeLabel='email'
            idLabel='email'
            textLabel='Email'
            refLabel={emailRef}
          />
          <LabelInput
            placeholder='1234 567 890'
            typeLabel='tel'
            idLabel='phoneNumber'
            textLabel='Phone number'
            refLabel={phoneNumberRef}
          />
          <PasswordLabelInput refLabel={passwordRef} />
        </div>
        <ButtonSubmit
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          error={error}
          isLogin={false}
        />
      </form>
      <div className='mt-5 text-center'>
        <p className='opacity-75'>
          By continuing, you agree to accept our
          <br />
          <Link className='underline hover:opacity-75' to='/login'>
            Privacy Policy & Terms of Service.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
