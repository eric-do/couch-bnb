import { useState, useEffect } from 'react';
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'
import SearchInput from '~/components/search';
import Map, { Marker } from '~/components/map';

export default function Search() {
  const [houses, setData] = useState<IHouseCard[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch('/api/listings')
      const data = await res.json();
      setData(data);
      setLoading(false);
    }

    getData();
  }, [])


  return (
    <div className="">
      <Map className="h-[50vh] w-screen fixed top-0">
        <Marker position={[51.505, -0.09]}>
          <div>test</div>
        </Marker>
      </Map>
      <div className="top-14 py-3 fixed z-50 w-screen px-5 bg-white flex shadow-xl md:top-16">
        <SearchInput className="my-3 bg-gray-100"/>
      </div>
      <div className="bg-white relative mt-[50vh] rounded-t-3xl pt-5 px-5 h-fit lg:mt-20 lg:w-8/12 xl:7/12 lg:rounded-none">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="h-1 w-12 bg-gray-300 rounded-md mb-5"></div>
          <div className="text-black font-semibold text-sm">Over 1,000 homes within map area</div>
        </div>
        <div className="flex flex-col space-y-16 sm:space-y-0 sm:flex-wrap sm:gap-y-10 sm:flex-row ">
          {
            houses.map(house =>
            <div key={house.id} className="w-full sm:w-72 sm:flex sm:items-start sm:mr-10">
              <HouseCard house={house} />
            </div>
            )
          }
        </div>
      </div>

    </div>
  )
}
