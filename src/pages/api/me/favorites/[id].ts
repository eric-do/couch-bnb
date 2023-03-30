import type { NextApiRequest, NextApiResponse } from "next";

interface PostData {
  status: string;
  id: string | string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {

  // TODO: authenticate user

  if (req.method === 'DELETE') {
    if (req.query.id) {
      const { id } = req.query;
      res.status(201).json({ id, status: 'success' })
    }
    }
}