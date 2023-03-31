import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Props {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  className: string;
  onClick?: () => void;
}

export default function SearchInput({
  location,
  checkIn,
  checkOut,
  className,
  onClick = () => {}
}: Props) {
  return (
    <div
      className={`w-full px-5 py-5 bg-gray-200 flex flex-row justify-start items-center shadow-lg lg:hidden rounded-full ${className}`}
      onClick={onClick}
    >
      <FaSearch className="mr-5 text-gray-700" />
      <div className="flex flex-col space-y-1">
        <div className="text-black font-semibold text-xs">Mexico City</div>
        <div className="text-gray-600 font-light text-xs">Apr 9 - Apr 23</div>
      </div>
    </div>
  );
}

interface FakeSearchProps {
  className?: string;
  onClick?: () => void;
}
export const MobileFakeSearch = ({ className="", onClick }: FakeSearchProps) => {
  return (
    <div
      className={`w-full px-5 py-5 bg-white flex flex-row justify-start items-center border-gray-300 border lg:hidden rounded-xl ${className}`}
      onClick={onClick}
    >
      <FaSearch className="mr-5 text-gray-700" />
    </div>
  );
}