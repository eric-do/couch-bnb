import { rest } from 'msw'
import { generateFavorites, generateListings } from './data'

const listings = generateListings(5)

export const handlers = [
  rest.get('/api/listings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(listings)
    )
  }),

  rest.get('/api/me/favorites', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([generateFavorites(listings, 2)])
    )
  }),
]