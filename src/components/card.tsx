import Image from "next/image";
import { useState } from 'react';
import { createPortal } from "react-dom";
import { FaHeart } from "react-icons/fa"
import { IHouseCard } from "~/types";
import Carousel, { CarouselItem } from "./carousel";
import SendRequestModal from "./modals/sendRequest";
import { useAddFavorite, useDeleteFavorite } from "~/api/";

interface Props {
  house: IHouseCard;
  favorites: string[];
}

export default function HouseCard({
  house: {
    id,
    images,
    title,
    description,
    rating,
    reviewCount,
    tags,
  },
  favorites
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const {
    mutate: addFavorite,
    isSuccess: isSuccessAddFavorite,
    isLoading: isLoadingAddFavorite,
    isError: isErrorAddFavorite
  }  = useAddFavorite(id);
  const {
    mutate: deleteFavorite,
    isSuccess: isSuccessDeleteFavorite,
    isLoading: isLoadingDeleteFavorite,
    isError: isErrorDeleteFavorite
  }  = useDeleteFavorite(id);

  return (
    <div
      className="flex flex-col"
    >

      <div className="w-full relative">

        {/* Badge and Favorite */}
        <div className="absolute flex left-1 right-1 justify-between mt-5 mx-5 z-40">
          <div className="btn btn-info btn-xs rounded-md">superhost</div>
          {!favorites.includes(id) && <FaHeart
            data-testid="favorite-inactive"
            size={25}
            className="opacity-50 text-black"
            onClick={() => addFavorite()}
          />}
          {favorites.includes(id) && <FaHeart
            data-testid="favorite-active"
            size={25}
            className="opacity-100 text-red-500"
            onClick={() => deleteFavorite()}
          />}
        </div>

        {/* Image carousel */}
        <div className="aspect-squares">
          <Carousel>
            {
              images.map((image) => {
                return (
                  <CarouselItem key={image}>
                    <Image
                      src={image}
                      className='aspect-square rounded-lg bg-yellow-300 w-full'
                      alt="house"
                      width={1000}
                      height={1000}
                    />
                  </CarouselItem>
                )
              })
            }
         </Carousel>
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
        <div className="text-gray-500 line-clamp-1 mt-1">{description}</div>
        {
          tags.length > 0 &&
            <div className="flex flex-nowrap sm:w-72 w-fit overflow-scroll gap-y-2 space-x-2 mt-2 items-center">
              <span className="text-gray-500 font-semibold">Wants:</span>
              {
                tags.map((tag) => (
                  <div key={tag} className="btn btn-xs btn-accent">{tag}</div>
                ))
              }
            </div>
        }
      </div>
      {/* CTA */}
      <div className="flex justify-center mt-3">
        <button
          className="btn btn-primary w-full"
          onClick={() => setShowModal(true)}
        >
          send request
        </button>
        { showModal && createPortal(
            <SendRequestModal onClose={() => setShowModal(false)} />,
            document.body
        )}
      </div>
    </div>
  )
}