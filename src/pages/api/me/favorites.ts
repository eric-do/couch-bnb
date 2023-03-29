import type { NextApiRequest, NextApiResponse } from "next";

const favorites: string[] = [
  'house1',
  'house3'
]

interface PostData {
  status: string;
  id: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | PostData >
) {

  // authenticate user

  if (req.method === 'POST') {
    const { body } = req;
    if ("id" in body && typeof body.id === 'string') {
      const { id } = body;

      // Add favorite

      res.status(201).json({ id, status: 'success' })
    }
  } else if (req.method === 'GET') {
    res.status(200).json(favorites);
  }
}