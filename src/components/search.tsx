import React, { useState, forwardRef } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import { FaSearch, FaArchway } from 'react-icons/fa';
import { IoLocationOutline, IoMapOutline } from "react-icons/io5";
import { useGetLocations } from '~/api';

interface Props {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  className: string;
  onClick?: () => void;
}

interface City {
    country: string;
    name: string;
    lat: string;
    lng: string;
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

//'boundary', 'highway', 'historic', 'tourism', 'amenity', 'place'}


const locationTypes = {
  boundary: <IoMapOutline />,
  place: <IoLocationOutline />,
  history: <FaArchway />
}

export const MobileFunctionalSearch = forwardRef<HTMLInputElement, MobileFunctionalSearchProps>(({
  className,
  onClick
}: MobileFunctionalSearchProps, ref) => {
  const [location, setLocation] = useState<string>('');
  const value = useDebounce(location, 200);
  const { locations, isError, isLoading } = useGetLocations(value);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setLocation(value);
  }

  return (
    <div className="flex flex-col space-y-2">
      <div
        className={`w-full px-4 bg-gray-100 flex flex-row justify-start items-center lg:hidden rounded-xl ${className} cursor-pointer`}
        onClick={onClick}
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
          locations?.map(({place_id, display_name, category}, index) => (
            <div key={`${place_id}`} className="flex flex-row space-x-3 cursor-pointer">
              <span>
                { category === "boundary" && <IoMapOutline size={20} /> }
                { category === "place" && <IoLocationOutline size={20} /> }
                { category === "historic" && <FaArchway size={20}  /> }
              </span>
              <span>{display_name}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
})

MobileFunctionalSearch.displayName = "MobileFunctionalSearch";