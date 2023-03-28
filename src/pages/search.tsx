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
    <div className="">
      <div className="bg-yellow-400 fixed top-0 h-screen w-screen">
        test
      </div>
      <div className="top-14 py-5 fixed z-50 w-screen pr-10 bg-white">
        <SearchInput className="my-3"/>
      </div>
      <div className="bg-white relative mt-[50vh] rounded-t-3xl pt-20 px-5 h-screen lg:mt-20 lg:w-8/12 xl:7/12 lg:rounded-none">
        <div className="flex flex-col space-y-16 sm:space-y-0 sm:flex-wrap sm:gap-y-10 sm:flex-row">
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
