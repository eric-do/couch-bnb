import type { NextApiRequest, NextApiResponse } from "next";
import type { IHouseCard } from "~/types";

const houses: IHouseCard[] = [{
  id: "house1",
  images: [
    "https://picsum.photos/1000",
    "https://picsum.photos/950",
    "https://picsum.photos/925"
  ],
  title: "A test house",
  description: "A test house description that should take 2 lines",
  rating: 4.98,
  reviewCount: 135,
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons"],
  status: "superhost"
},
{
  id: "house2",
  images: [
    "https://picsum.photos/920",
    "https://picsum.photos/900",
    "https://picsum.photos/890"
  ],
  title: "A test house 2",
  description: "A test house description that should take 2 lines or maybe not",
  rating: 4.80,
  reviewCount: 15,
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons"],
  status: "new"
},
{
  id: "house3",
  images: [
    "https://picsum.photos/930",
    "https://picsum.photos/915",
    "https://picsum.photos/895"
  ],
  title: "A test house 3",
  description: "A test house description that should take 2 lines or maybe not but this time yes",
  rating: 4.80,
  reviewCount: 15,
  tags: ["cooking", "cleaning", "yoga lessons", "Spanish lessons"],
  status: "new"
}]

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IHouseCard[]>
) {
  res.status(200).json(houses);
}