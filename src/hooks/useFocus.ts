import { useRef } from 'react';

export const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement>(null)

  const setFocus = () => {
    debugger
    htmlElRef.current && htmlElRef.current.focus()
  };

  return [htmlElRef, setFocus] as const;
}