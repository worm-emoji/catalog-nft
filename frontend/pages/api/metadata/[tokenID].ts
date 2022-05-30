import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from '../../../data/posts'
import { allPosts } from '../../../data/posts'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { tokenID } = req.query
  if (typeof tokenID !== 'string') {
    return res.status(500).json({ error: true })
  }

  if (!allPosts[tokenID]) {
    return res.status(404).json({ error: true, message: 'Not found' })
  }
  res.status(200).json(allPosts[tokenID])
}
