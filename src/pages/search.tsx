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
  tags: ["cooking", "cleaning", "yoga lessons"],
  status: "superhost"
}]

export default function Search() {
  return (
    <>
      Search page
      {
        houses.map(house => <HouseCard house={house} key={house.title}/>)
      }
    </>
  )
}
