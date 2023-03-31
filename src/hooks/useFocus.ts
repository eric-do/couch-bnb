import { useRef } from 'react';

export const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement>(null)

  const setFocus = () => {
    setTimeout(() => htmlElRef?.current?.focus(), 0)
  };

  return [htmlElRef, setFocus] as const;
}