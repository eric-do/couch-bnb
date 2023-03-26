import Image from "next/image";

interface Props {
  house: {
    images: string[];
    title: string;
    description: string;
    rating: number;
    reviewCount: number;
    pricing: {
      pricePerNight: number;
      currency: string;
      symbol: string;
      serviceFees: number;
    },
    totalNights: number;
  }
}

export default function HouseCard({
  house: {
    images,
    title,
    description,
    rating,
    reviewCount,
    pricing: {
      pricePerNight,
      currency,
      serviceFees
    },
    totalNights
}}: Props) {
  return (
    <div className="flex flex-col">

      {/* Image carousel */}
      <div className="w-full aspect-square">
        <Image
          src={images[0]}
          className='aspect-square rounded-lg bg-yellow-300'
          width={600}
          height={600}
          alt="house"
        />
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
    </div>
  )
}