import { useEffect } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce(
  callback: any,
  delay: any,
  dependencies: any
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
