import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '~/styles/Home.module.css'
import HouseCard from '~/components/card'
import { IHouseCard } from '~/types'


const houses: IHouseCard[] = [{
  images: [
    "https://picsum.photos/1000",
    "https://picsum.photos/1000",
    "https://picsum.photos/1000"
  ],
  title: "A test house",
  description: "A test house description that should take 2 lines",
  rating: 4.98,
  reviewCount: 135,
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons"],
  status: "superhost"
},
{
  images: [
    "https://picsum.photos/900",
    "https://picsum.photos/900",
    "https://picsum.photos/900"
  ],
  title: "A test house 2",
  description: "A test house description that should take 2 lines or maybe not",
  rating: 4.80,
  reviewCount: 15,
  tags: [],
  status: "new"
}]

export default function Search() {
  return (
    <div>
      Search page
      <div className="flex flex-col space-y-16">
        {
          houses.map(house => <HouseCard house={house} key={house.title}/>)
        }
      </div>
    </div>
  )
}
