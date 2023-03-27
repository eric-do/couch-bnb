import Image from "next/image";
import { useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { IHouseCard } from "~/types";

interface Props {
  house: IHouseCard
}

export default function HouseCard({
  house: {
    images,
    title,
    description,
    rating,
    reviewCount,
}}: Props) {
  const [isHiddenButtons, setButtonsHidden] = useState(true);

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setButtonsHidden(false)}
      onMouseLeave={() => setButtonsHidden(true)}
    >

      {/* Image carousel */}
      <div className="w-full relative">
        <div className="absolute flex left-3 right-3 justify-between mt-5 mx-5 z-50">
          <div className="btn btn-info btn-xs rounded-md">Superhost</div>
          <FaRegHeart size={20}/>
        </div>
        <div className="aspect-square carousel">
        {
          images.map((image, i) => {
            const prev = i - 1 < 0 ? images.length - 1 : i - 1;
            const next = i + 1 > images.length - 1 ? 0 : i + 1;

            return (
              <div id={`slide${i}`} key={image} className="carousel-item relative w-full">
                <Image
                  src={images[0]}
                  className='aspect-square rounded-lg bg-yellow-300'
                  width={600}
                  height={600}
                  alt="house"
                />
                <div className={`absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ${isHiddenButtons && "hidden"}`}>
                  <div>
                    <a href={`#slide${prev}`} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${i === 0 && "hidden"}`}>
                      ❮
                    </a>
                  </div>
                  <div>
                    <a href={`#slide${next}`} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${i === images.length - 1 && "hidden"}`}>
                      ❯
                    </a>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>

      {/* Property details */}
      <div className='flex flex-col mt-3 text-sm'>
        <div className='flex flex-row justify-between'>
          <span className='text-black font-bold'>{title}</span>
          <div className='space-x-1'>
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
        </div>
        <div className="text-gray-500">{description}</div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-5">
        <button className="btn btn-primary w-full">Send request</button>
      </div>
    </div>
  )
}