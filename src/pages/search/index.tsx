// External libraries
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { LazyMap, LazyMarker, LazyPopup } from '~/components/leafletMap.lazy';

// Custom hooks and APIs
import { useListings, useFavorites } from '~/api/';

// Components
import { FaTimes, FaChevronLeft } from 'react-icons/fa';
import SearchInput from '~/components/search';
import HouseCard from '~/components/card'
import { SearchLocation, BookingSearchPreference } from '~/types';
import MobileSearchDrawer from './MobileDrawer';

type SearchState = 'base' | 'baseDrawer' | 'isSearching' | 'hasSelected'

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

  const handleCloseDrawer = () => {
    setIsExpanded(false);
  }

  return (
    <div className="">

      {/* Map */}
      <LazyMap className="h-screen w-screen fixed top-[9.5rem]">
        <LazyMarker position={[51.505, -0.09]}>
          <LazyPopup>
            <div>test</div>
          </LazyPopup>
        </LazyMarker>
      </LazyMap>

      {/* Search */}
      <div
        className={
          clsx([
            'py-4 fixed w-screen flex items-start justify-center shadow-xl bg-white', // general CSS
            'transition-all duration-300 ease-out', // animations,
            'md:top-16', // medium screen
            isExpanded ? "h-screen z-modal !top-0 !bg-gray-200" : "z-50 !top-14", // drawer display: ;
          ])
        }
      >
        <SearchInput
          className={`${isExpanded && "hidden"} mx-5`}
          onClick={() => setIsExpanded(true)}
        />

        {/* Drawer */}
        {isExpanded && <MobileSearchDrawer handleCloseDrawer={handleCloseDrawer} />}
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
