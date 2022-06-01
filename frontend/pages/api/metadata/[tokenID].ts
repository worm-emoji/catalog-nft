import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from '../../../data/posts'
import { getAllPosts } from '../../../data/posts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { tokenID } = req.query
  if (typeof tokenID !== 'string') {
    return res.status(500).json({ error: true })
  }
  const { allPosts } = await getAllPosts()

  if (!allPosts[tokenID]) {
    return res.status(404).json({ error: true, message: 'Not found' })
  }
  res.setHeader('Cache-Control', 's-maxage=86400')

  res.status(200).json(allPosts[tokenID])
}
