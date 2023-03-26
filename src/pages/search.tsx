import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '~/styles/Home.module.css'
import HouseCard from '~/components/card'


const houses = [{
  images: [
    "https://picsum.photos/1000",
    "https://picsum.photos/1000",
    "https://picsum.photos/1000"
  ],
  title: "A test house",
  description: "A test house description that should take 2 lines",
  rating: 4.98,
  reviewCount: 135,
  pricing: {
    pricePerNight: 123,
    currency: "USD",
    symbol: "$",
    serviceFees: 300,
  },
  totalNights: 14,
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
