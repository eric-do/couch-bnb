import { useState, useEffect } from 'react';
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'
import SearchInput from '~/components/search';
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

  return (
    <div className="">

      {/* Map */}
      <LazyMap className="h-screen w-screen fixed top-44">
        <LazyMarker position={[51.505, -0.09]}>
          <LazyPopup>
            <div>test</div>
          </LazyPopup>
        </LazyMarker>
      </LazyMap>

      {/* Search */}
      <div className="top-14 py-3 fixed z-50 w-screen px-5 bg-white flex shadow-xl md:top-16">
        <SearchInput className="my-3 bg-gray-100"/>
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
