import type { NextApiRequest, NextApiResponse } from 'next'
import { posts } from '../../../data/posts'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  res.status(200).json(posts)
}
