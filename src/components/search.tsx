import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface Props {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  className: string;
}

export default function SearchInput({
  location,
  checkIn,
  checkOut,
  className
}: Props) {
  return (
    <div className={`w-full rounded-full px-5 py-5 bg-gray-50 flex flex-row justify-start items-center shadow-lg ${className}`}>
      <FaSearch className="mr-5 text-gray-700" />
      <div className="flex flex-col">
        <div className="text-black font-semibold text-xs">Mexico City</div>
        <div className="text-gray-600 font-light text-xs">Apr 9 - Apr 23</div>
      </div>
    </div>
  );
}
