import { useState, useEffect } from 'react';
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'
import SearchInput from '~/components/search';
import { LazyMap, LazyMarker } from '~/components/leafletMap.lazy';

export default function Search() {
  const [houses, setHouses] = useState<IHouseCard[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getListings() {
      const res = await fetch('/api/listings')

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Could not get listings")
      } else {
        const data = await res.json();
        setHouses(data);
      }
    }

    async function getFavorites() {
      const res = await fetch('/api/me/favorites')

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Could not get listings")
      } else {
        const data = await res.json();
        setFavorites(data);
      }
    }

    setLoading(true);

    Promise
      .all([getListings(), getFavorites()])
      .then(() => setLoading(false))
      .catch(() => setError(true))
  }, [])


  return (
    <div className="">

      {/* Map */}
      <LazyMap className="h-screen w-screen fixed top-44">
        <LazyMarker position={[51.505, -0.09]}>
          <div>test</div>
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
            houses.map(house =>
            <div key={house.id} className="w-full sm:w-72 sm:flex sm:items-start sm:mr-10">
              <HouseCard house={house} favorites={favorites}/>
            </div>
            )
          }
        </div>
      </div>

    </div>
  )
}
