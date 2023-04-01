import { screen } from '@testing-library/react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { IHouseCard } from '~/types';
import HouseCard from '~/components/card';
import { render, server } from '~/utils/testUtils';
import { generateListings } from '~/utils/mocks/data';

describe('Listing card', () => {
  it('renders a correct elements', () => {

    const house: IHouseCard = generateListings(1)[0];

    const favorites = [house.id];

    render(<HouseCard house={house} favorites={favorites} />);

    const images = screen.queryAllByRole('img');
    const title = screen.getByText(house.title);
    const description = screen.getByText(house.description);
    const rating = screen.getByText(house.rating);
    const reviewCount = screen.getByText(`(${house.reviewCount})`);
    const status = screen.getByText(`${house.status}`);
    const imageBullets = screen.queryAllByTestId("image-bullet");
    const favorite = screen.getByTestId('favorite-active');


    expect(images.length).toBe(house.images.length);
    expect(imageBullets.length).toBe(house.images.length);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(reviewCount).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(status).toBeInTheDocument();

    house.tags.forEach(tag => {
      const res = screen.getByText(tag);
      expect(res).toBeInTheDocument();
    })
  })

  it('does not render active favorite if listing is not in user favorites', () => {

    const house: IHouseCard = generateListings(1)[0];

    const favorites: string[] = [];

    render(<HouseCard house={house} favorites={favorites} />);

    const inactiveFavorite = screen.getByTestId('favorite-inactive');

    expect(inactiveFavorite).toBeInTheDocument();
  })

  it('calls server to add favorite when user clicks inactive favorite button', async () => {
    let called = false;

    server.use(
      rest.post('/api/me/favorites', (req, res, ctx) => {
        called = true;

        expect(called).toBe(true);

        return res.once(ctx.json(favorites))
      })
    )

    const house: IHouseCard = generateListings(1)[0];
    const favorites: string[] = [];

    render(<HouseCard house={house} favorites={favorites} />);

    const button = screen.getByTestId('favorite-inactive');
    await userEvent.click(button);
  })

  it('calls server to remove favorite when user clicks active favorite button', async () => {
    let called = false;
    const house: IHouseCard = generateListings(1)[0];
    const favorites: string[] = [house.id];

    server.use(
      rest.delete(`/api/me/favorites/${house.id}`, (req, res, ctx) => {
        called = true;

        expect(called).toBe(true);

        return res.once(ctx.json(favorites))
      })
    )


    render(<HouseCard house={house} favorites={favorites} />);

    const button = screen.getByTestId('favorite-active');
    await userEvent.click(button);
  })
})