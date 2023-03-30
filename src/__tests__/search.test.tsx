import { queryAllByText, screen } from '@testing-library/react';
import { rest } from 'msw';
import '@testing-library/jest-dom';
import { IHouseCard } from '~/types';
import Search from '~/pages/search';
import { render, server } from '~/utils/testUtils';
import { generateListings } from '~/utils/mocks/data';

describe('Listing card', () => {
  it('renders a correct number of house listings', async () => {
    const count = 5;
    const listings = generateListings(count);

    server.use(
      rest.get('/api/listings', (req, res, ctx) => {
        return res.once(ctx.json(listings))
      })
    )

    render(<Search />);

    const houseCardCTAs = await screen.findAllByRole('button', { name: "send request" });
    expect(houseCardCTAs.length).toBe(count);
  })
})