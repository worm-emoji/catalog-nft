import cheerio from 'cheerio'
import orderBy from 'lodash.orderby'
import { getSignature } from './sign'
import { Hex } from "viem";

export type Data = {
  error?: boolean
  message?: string
  description?: string
  external_url?: string
  name?: string
  image?: string
  signature: Hex
  id: number
  width?: number
  height?: number
  attributes?: {
    trait_type: string
    value: string | number
    display_type?: string
  }[]
}

export interface Thumbnail {
  width: number
  height: number
  name: string
  path: string
  url: string
  ratio: string
}

export interface AllEntry {
  html: string
  name: string
  path: string
  pathDisplay: string
  id: string
  thumbnail: Thumbnail
  draft: boolean
  size: number
  dependencies: string[]
  dateStamp: number
  updated: number
  title: string
  titleTag: string
  body: string
  summary: string
  internalLinks: any[]
  teaser: string
  teaserBody: string
  more: boolean
  slug: string
  tags: any[]
  deleted: boolean
  page: boolean
  menu: boolean
  permalink: string
  guid: string
  created: number
  backlinks: any[]
  scheduled: boolean
  url: string
  first?: boolean
  position: number
  absoluteURL: string
  date: string
  penultimate?: boolean
  last?: boolean
}

export async function getAllPosts(): Promise<{
  allPosts: { [key: string]: Data }
  posts: Data[]
}> {
  console.error('FETCH CALLED')
  const r = await fetch('https://luke.cat/?debug=true')
  const d = await r.json()
  const allEntries: AllEntry[] = d.allEntries.filter((p: AllEntry) => {
    // filter out invalid image
    return p.created != 1567929626847
  })
  const allPosts: { [key: string]: Data } = {}

  const posts = orderBy(
    await Promise.all(
      allEntries.map(async (post) => {
        const $ = cheerio.load(post.html)
        const url = $('img').attr('src')
        const width = Number($('img').attr('width'))
        const height = Number($('img').attr('height'))

        const ts = post.updated / 1000
        const signature = await getSignature(ts)
        const p: Data = {
          id: ts,
          image: url,
          name: getName(new Date(post.updated)),
          external_url: post.absoluteURL,
          signature,
          width,
          height,
          attributes: [
            {
              trait_type: 'Year',
              value: new Date(post.updated).getFullYear().toString(),
            },
            {
              display_type: 'date',
              trait_type: 'taken at',
              value: ts,
            },
          ],
        }
        allPosts[ts] = p
        return p
      })
    ),
    'id',
    'desc',
  )
  return { allPosts, posts }
}

const withLeadingZero = (num: number) => {
  return num < 10 ? `0${num}` : num
}

const getName = (tsv: Date) => {
  const [month, day, year, hours, minutes, seconds] = [
    withLeadingZero(tsv.getMonth() + 1),
    withLeadingZero(tsv.getDate()),
    tsv.getFullYear(),
    withLeadingZero(tsv.getHours()),
    withLeadingZero(tsv.getMinutes()),
    withLeadingZero(tsv.getSeconds()),
  ]

  return `Screenshot ${year}-${month}-${day} at ${hours}.${minutes}.${seconds}`
}
