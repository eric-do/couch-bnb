import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'
import SearchInput, { MobileFakeSearch } from '~/components/search';
import { LazyMap, LazyMarker, LazyPopup } from '~/components/leafletMap.lazy';
import { useListings, useFavorites } from '~/api/';

export default function Search() {
  const {
    listings,
    isError: isErrorListings,
    isLoading: isLoadingListings
  } = useListings();

  const {
    favorites,
    isError: isErrorFavorites,
    isLoading: isLoadingFavorites
  } = useFavorites();

  const [isExpanded, setIsExpanded] = useState(false);
  console.log(isExpanded)
  return (
    <div className="">

      {/* Map */}
      <LazyMap className="h-screen w-screen fixed top-40">
        <LazyMarker position={[51.505, -0.09]}>
          <LazyPopup>
            <div>test</div>
          </LazyPopup>
        </LazyMarker>
      </LazyMap>

      {/* Search */}
      <div
        className={`transition-all duration-300 ease-out py-4 fixed w-screen px-5 bg-white flex items-start justify-center shadow-xl md:top-16 ${isExpanded ? "h-screen bg-gray-200 z-modal top-0" : "z-50 top-14"}`}
      >
        <SearchInput className={`${isExpanded && "hidden"}`} onClick={() => setIsExpanded(true)}/>

        <div className={`${isExpanded ? "visible" : "hidden"} w-full flex flex-col space-y-5`}>
          <div
            className={`btn btn-circle btn-outline btn-sm border text-gray-400 mb-5 bg-white`}
            onClick={() => setIsExpanded(false)}
          >
            <FaTimes className="text-black"/>
          </div>
          <div className={`w-full p-5 flex justify-start flex-col space-y-5 bg-white shadow-2xl rounded-2xl transition-[max-height] duration-300`}>
            <h1 className="font-bold text-lg text-black">Where to?</h1>
            <MobileFakeSearch />
          </div>
          <button className={`w-full p-5 flex justify-between bg-white shadow-md rounded-xl transition-[max-height] duration-300`}>
            <div className="text-gray-500 text-sm">When</div>
            <div className="text-gray-800 text-sm font-semibold">Add dates</div>
          </button>
          <button className={`w-full p-5 flex justify-between bg-white shadow-md rounded-xl transition-[max-height] duration-300`}>
            <div className="text-gray-500 text-sm">Who</div>
            <div className="text-gray-800 text-sm font-semibold">Add guests</div>
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white relative mt-[50vh] rounded-t-3xl pt-3 px-5 h-fit lg:mt-20 lg:w-8/12 xl:7/12 lg:rounded-none lg:h-screen">
        <div className="flex flex-col justify-center items-center mb-6 lg:items-start lg:pt-10">
          <div className="h-1 w-12 bg-gray-300 rounded-md mb-5 lg:hidden"></div>
          <div className="text-black font-semibold text-sm">Over 1,000 homes within map area</div>
        </div>
        <div className="flex flex-col space-y-16 sm:space-y-0 sm:flex-wrap sm:gap-y-10 sm:flex-row ">
          {
            listings && listings.map(listing =>
            <div key={listing.id} className="w-full sm:w-72 sm:flex sm:items-start sm:mr-10">
              <HouseCard house={listing} favorites={favorites || []}/>
            </div>
            )
          }
        </div>
      </div>

    </div>
  )
}
