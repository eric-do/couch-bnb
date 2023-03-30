import { rest } from 'msw'
import { listings } from './data'

export const handlers = [
  rest.get('/api/listings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(listings)
    )
  }),

  rest.get('/me/favorites', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(['home1', 'home3'])
    )
  })
]