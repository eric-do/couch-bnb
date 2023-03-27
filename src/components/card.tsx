import Image from "next/image";
import { useState } from 'react';
import { FaCircle, FaHeart } from "react-icons/fa"
import { IHouseCard } from "~/types";

interface Props {
  house: IHouseCard
}

export default function HouseCard({
  house: {
    id,
    images,
    title,
    description,
    rating,
    reviewCount,
    tags
}}: Props) {
  const [isHiddenButtons, setButtonsHidden] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setButtonsHidden(false)}
      onMouseLeave={() => setButtonsHidden(true)}
    >

      {/* Image carousel */}
      <div className="w-full relative">
        <div className="absolute flex left-1 right-1 justify-between mt-5 mx-5 z-40">
          <div className="btn btn-info btn-xs rounded-md">Superhost</div>
          <FaHeart size={20} className="opacity-50"/>
        </div>
        <div className="aspect-square carousel">
        {
          images.map((image, i) => {
            const prev = i - 1 < 0 ? images.length - 1 : i - 1;
            const next = i + 1 > images.length - 1 ? 0 : i + 1;

            return (
              <div id={`listing-${id}-slide-${i}`} key={image} className="carousel-item relative w-full">
                <Image
                  src={image}
                  className='aspect-square rounded-lg bg-yellow-300 w-full'
                  alt="house"
                  fill
                />
                <div className={`absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ${isHiddenButtons && "hidden"}`}>
                  <div>
                    <a href={`#listing-${id}-slide-${prev}`} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${i === 0 && "hidden"}`}>
                      ❮
                    </a>
                  </div>
                  <div>
                    <a href={`#listing-${id}-slide-${next}`} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${i === images.length - 1 && "hidden"}`}>
                      ❯
                    </a>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div className="absolute flex left-1 right-1 bottom-3 mx-5 z-40 justify-center items-center">
          {
            images.map((image, i) => {
            return (
              <FaCircle
                key={image}
                size={9}
                className="opacity-70 text-white mx-0.5"
                data-testid="image-bullet"
              />
            );
            })
          }
        </div>
        </div>
      </div>

      {/* Property details */}
      <div className='flex flex-col mt-3 text-sm '>
        <div className='flex flex-row justify-between'>
          <span className='text-black font-bold'>{title}</span>
          <div className='space-x-1'>
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
        </div>
        <div className="text-gray-500">{description}</div>
        {
          tags.length > 0 &&
            <div className="flex flex-wrap gap-y-2 space-x-2 mt-2 items-center">
              <span className="text-gray-500 font-semibold">Looking for:</span>
              {
                tags.map((tag) => (
                  <div key={tag} className="btn btn-xs btn-accent">{tag}</div>
                ))
              }
            </div>
        }
      </div>
      {/* CTA */}
      <div className="flex justify-center mt-5">
        <button className="btn btn-primary w-full">Send request</button>
      </div>
    </div>
  )
}