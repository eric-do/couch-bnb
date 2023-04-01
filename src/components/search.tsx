import React, { useState, forwardRef } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import { FaSearch, FaArchway, FaRoute } from 'react-icons/fa';
import { IoLocationOutline, IoMapOutline } from "react-icons/io5";
import { useGetLocations } from '~/api';
import type { GenericCustomComponent, SearchLocation } from '~/types';

export default function SearchInput({
  className,
  onClick = () => {}
}: GenericCustomComponent) {
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

export const MobileFakeSearch = ({ className="", onClick }: GenericCustomComponent) => {
  return (
    <div
      className={`w-full px-4 bg-white flex flex-row justify-start items-center border-gray-300 border lg:hidden rounded-xl ${className} cursor-pointer`}
      onClick={onClick}
    >
      <FaSearch className="mr-5 text-gray-700 my-5" />
    </div>
  );
}

//'boundary', 'highway', 'historic', 'tourism', 'amenity', 'place'}


const locationTypes = {
  boundary: <IoMapOutline />,
  place: <IoLocationOutline />,
  history: <FaArchway />
}

interface SearchProps {
  location?: SearchLocation;
  className?: string;
  onClick?: (l: SearchLocation) => void;
}

export const MobileFunctionalSearch = forwardRef<HTMLInputElement, SearchProps>(({
  className,
  onClick: chooseLocation = (location: SearchLocation) => {}
}: SearchProps, ref) => {
  const [location, setLocation] = useState<string>('');
  const value = useDebounce(location, 200);
  const { locations, isError, isLoading } = useGetLocations(value);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setLocation(value);
  }

  const handleChooseLocation = (location: SearchLocation) => {
    setLocation('');
    chooseLocation(location);
  }

  return (
    <div className="flex flex-col space-y-2">
      <div
        className={`w-full px-4 bg-gray-100 flex flex-row justify-start items-center lg:hidden rounded-xl ${className} cursor-pointer mb-5`}
      >
        <FaSearch className="mr-5 text-gray-700 my-5" />
        <input
          ref={ref}
          type="text"
          className="border-0 bg-transparent outline-none font-light text-sm text-black w-full"
          value={location}
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col space-y-10 text-black text-sm">
        {
          locations?.map((location, index) => {
            const {place_id, display_name, category} = location;

            return (<div
              key={`${place_id}`}
              className="flex flex-row space-x-3 cursor-pointer"
              onClick={() => handleChooseLocation(location)}
            >
              <span>
                { category === "boundary" ? <IoMapOutline size={20} /> :
                  category === "place" ? <IoLocationOutline size={20} /> :
                  category === "historic" ? <FaArchway size={20}  /> :
                  <FaRoute size={20} />
                }
              </span>
              <span>{display_name}</span>
            </div>
          )})
        }
      </div>
    </div>
  );
})

MobileFunctionalSearch.displayName = "MobileFunctionalSearch";