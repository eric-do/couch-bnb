import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Props {

}

export default function TextArea({ }: Props) {
  return (
    <textarea className="border border-black p-2 resize-none w-full bg-white text-black"></textarea>
  );
}
