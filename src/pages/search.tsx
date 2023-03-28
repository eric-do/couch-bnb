import { useState, useEffect } from 'react';
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'
import SearchInput from '~/components/search';

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
    <div className="bg-yellow-400 relative">
      <div className="top-14 py-5 fixed z-50 w-screen pr-10 bg-white">
        <SearchInput className="my-3"/>
      </div>
      <div className="bg-white relative mt-[50vh]">
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
