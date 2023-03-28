import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';

interface ItemProps {
  children: React.ReactNode;
}

interface CarouselProps {
  children: React.ReactNode;
}

export function CarouselItem({ children }: ItemProps) {
  return (
    <div className="inline-flex h-full md:h-72">
        { children }
    </div>
  );
}

export default function Carousel({ children }: CarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHiddenButtons, setButtonsHidden] = useState(true);
  const childrenCount = React.Children.count(children);

  const prev = () => setImageIndex(imageIndex - 1 < 0 ? childrenCount - 1 : imageIndex - 1);
  const next = () => setImageIndex(imageIndex + 1 > childrenCount - 1 ? 0 : imageIndex + 1);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onMouseEnter={() => setButtonsHidden(false)}
      onMouseLeave={() => setButtonsHidden(true)}
    >

      {/* chevrons */}
      <div className={`absolute z-10 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ${isHiddenButtons && "hidden"}`}>
        <div>
          <a onClick={prev} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${imageIndex === 0 && "hidden"}`}>
            ❮
          </a>
        </div>
        <div>
          <a onClick={next} className={`btn btn-sm btn-circle bg-white text-black font-light opacity-80 border-gray-300 shadow-md ${imageIndex === childrenCount - 1 && "hidden"}`}>
            ❯
          </a>
        </div>
      </div>

      {/* Content */}
      <div className={`whitespace-nowrap duration-300 transition-transform -translate-x-[${imageIndex * 100}%]`}>
        { children }
      </div>

      {/* bullets */}
      <div className="absolute flex left-1 right-1 bottom-5 mx-5 z-40 justify-center items-center">
        {
          React.Children.map(children, (_, i) => {
          return (
            <FaCircle
              key={i}
              size={9}
              className={`${imageIndex === i ? "opacity-95" : "opacity-60"} text-white mx-0.5`}
              data-testid="image-bullet"
            />
          );
          })
        }
      </div>
    </div>
  );
};