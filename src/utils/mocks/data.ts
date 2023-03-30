import { IHouseCard } from "~/types";

export const listings: IHouseCard[] = [{
  id: "house1",
  images: [
    "https://picsum.photos/2000",
    "https://picsum.photos/1900",
    "https://picsum.photos/1950"
  ],
  title: "A test house",
  description: "A test house description that should take 2 lines",
  rating: 4.98,
  reviewCount: 135,
  position: [51.505, -0.09],
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons", "French lessons", "coding"],
  status: "superhost"
},
{
  id: "house2",
  images: [
    "https://picsum.photos/1980",
    "https://picsum.photos/1920",
    "https://picsum.photos/1910"
  ],
  title: "A test house 2",
  description: "A test house description that should take 2 lines or maybe not",
  rating: 4.80,
  position: [51.505, -0.09],
  reviewCount: 15,
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons"],
  status: "new"
}]