import { queryAllByText, screen } from '@testing-library/react';
import { rest } from 'msw';
import '@testing-library/jest-dom';
import { IHouseCard } from '~/types';
import Search from '~/pages/search';
import { render, server } from '~/utils/testUtils';
import { generateListings, generateFavorites } from '~/utils/mocks/data';

describe('Search page', () => {
  it('renders a correct number of house listings', async () => {
    const listingsCount = 5;
    const favoritesCount = 3
    const listings = generateListings(listingsCount);
    const favorites = generateFavorites(listings, favoritesCount)

    server.use(
      rest.get('/api/listings', (req, res, ctx) => {
        return res.once(ctx.json(listings))
      })
    )
    server.use(
      rest.get('/api/me/favorites', (req, res, ctx) => {
        return res.once(ctx.json(favorites))
      })
    )

    render(<Search />);

    const houseCardCTAs = await screen.findAllByRole('button', { name: "send request" });
    const activeFavorites = await screen.findAllByTestId('favorite-active')
    const inactiveFavorites = await screen.findAllByTestId('favorite-inactive')

    expect(houseCardCTAs.length).toBe(listingsCount);
    expect(activeFavorites.length).toBe(favoritesCount);
    expect(inactiveFavorites.length).toBe(listings.length - favoritesCount);
  })
})