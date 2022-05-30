import posts from './posts.json'
import cheerio from 'cheerio'
import { getSignature } from './sign'

export type Data = {
  error?: boolean
  message?: string
  description?: string
  external_url?: string
  name?: string
  image?: string
  signature?: string
  id?: number
  attributes?: {
    trait_type: string
    value: string | number
    display_type?: string
  }[]
}

export const allPosts: { [key: string]: Data } = {}

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

posts.allEntries.map((post) => {
  const $ = cheerio.load(post.html)
  const url = $('img').attr('src')
  const ts = post.updated / 1000
  const signature = getSignature(ts)
  allPosts[ts] = {
    id: ts,
    image: url,
    name: getName(new Date(post.updated)),
    external_url: post.absoluteURL,
    signature,
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
})
