import { rest } from 'msw'
import { generateListings } from './data'

export const handlers = [
  rest.get('/api/listings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(generateListings(5))
    )
  }),

  rest.get('/me/favorites', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(['home1', 'home3'])
    )
  })
]