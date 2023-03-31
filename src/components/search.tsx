import React, { useState, forwardRef } from 'react';
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
      className={`w-full px-4 bg-white flex flex-row justify-start items-center border-gray-300 border lg:hidden rounded-xl ${className} cursor-pointer`}
      onClick={onClick}
    >
      <FaSearch className="mr-5 text-gray-700 my-5" />
    </div>
  );
}

interface MobileFunctionalSearchProps {
  className?: string;
  onClick?: () => void;
}

export const MobileFunctionalSearch = forwardRef<HTMLInputElement, MobileFunctionalSearchProps>(({
  className,
  onClick
}: MobileFunctionalSearchProps, ref) => {

  return (
    <div
      className={`w-full px-4 bg-gray-100 flex flex-row justify-start items-center lg:hidden rounded-xl ${className} cursor-pointer`}
      onClick={onClick}
    >
      <FaSearch className="mr-5 text-gray-700 my-5" />
      <input

        ref={ref}
        type="text"
        className="border-0 bg-transparent outline-none font-light text-sm text-black w-full"
      />
    </div>
  );
})

MobileFunctionalSearch.displayName = "MobileFunctionalSearch";