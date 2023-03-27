import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IHouseCard } from '~/types';
import HouseCard from '~/components/card';

describe('Navbar', () => {
  it('renders a correct elements', () => {

    const house: IHouseCard = {
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
    };

    render(<HouseCard house={house} />)

    const images = screen.queryAllByRole('img');
    const title = screen.getByText(house.title);
    const description = screen.getByText(house.description);
    const rating = screen.getByText(house.rating);
    const reviewCount = screen.getByText(`(${house.reviewCount})`);
    const imageBullets = screen.queryAllByTestId("image-bullet");


    expect(images.length).toBe(house.images.length);
    expect(imageBullets.length).toBe(house.images.length);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(reviewCount).toBeInTheDocument();

    house.tags.forEach(tag => {
      const res = screen.getByText(tag);
      expect(res).toBeInTheDocument();
    })
  })
})