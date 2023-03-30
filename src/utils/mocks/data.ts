import { IHouseCard } from "~/types";
import { faker } from '@faker-js/faker';

const generateRandomInt = (max: number) =>  Math.floor(Math.random() * max)

export const generateListings = (count: number): IHouseCard[] => {
   return <IHouseCard[] >Array
    .from({ length: count })
    .map(_ => ({
      id: faker.lorem.slug(),
      images: Array
        .from({
          length: generateRandomInt(20),
        })
        .map((_, i) => faker.image.imageUrl() + i),
      title: faker.lorem.lines(1),
      description: faker.lorem.lines(1),
      rating: faker.datatype.number({
        precision: 0.01,
        max: 5,
        min: 0
      }),
      reviewCount: faker.datatype.number({ max: 1000 }),
      position: [
        faker.datatype.number({
          min: -90,
          max: 90,
          precision: 0.01
        }),
        faker.datatype.number({
          min: -180,
          max: 180,
          precision: 0.01
        }),
      ],
      tags: Array
        .from({
          length: generateRandomInt(10)
        })
        .map(_ => faker.lorem.word()),
      status: ["superhost", "new"][generateRandomInt(2)]
    }))
}