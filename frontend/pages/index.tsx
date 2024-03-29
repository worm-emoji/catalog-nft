import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import shuffle from 'lodash.shuffle'
import { Screenshot } from '../components/Screenshot'
import { getAllPosts } from '../data/posts'

export async function getStaticProps() {
  const { posts } = await getAllPosts()
  return {
    props: {
      screenshots: posts,
    },
  }
}

function Home({ screenshots }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [shots, setShots] = useState(screenshots)
  return (
    <div>
      <Head>
        <title>mint from the screenshot catalog</title>
        <meta
          property="og:description"
          content="i've been collecting screenshots on luke.cat for the past few years. now, you can own any screenshot from the catalog as an NFT."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="mint from the screenshot catalog" />
        <meta property="og:image" content="https://mint.luke.cat/og.png" />
      </Head>
      <div className="flex w-100 justify-center">
        <div className="px-2 flex flex-col justify-center items-center w-100 max-w-md gap-5 text-white pb-12">
          <h2 className="text-2xl">mint from the screenshot catalog</h2>
          <h2 className="pt-2 text-lg underline underline-offset-4 self-start">
            about
          </h2>
          <p>
            i&apos;ve been collecting screenshots on{' '}
            <a
              className="underline underline-offset-1"
              href="https://luke.cat"
              target="_blank"
              rel="noreferrer"
            >
              luke.cat
            </a>{' '}
            for the past few years. now, you can own any screenshot from the
            catalog of {screenshots.length} NFTs.
          </p>
          <h2 className="text-lg underline underline-offset-4 self-start">
            roadmap &amp; utility
          </h2>
          <p className="self-start">
            collecting a screenshot also grants you access to the token-gated{' '}
            <a
              className="underline underline-offset-1"
              href="https://discord.gg/z2jMqkgBHJ"
              target="_blank"
              rel="noreferrer"
            >
              official project discord
            </a>
            . the discord is a place to ask questions, share screenshots you
            love, and commiserate with fellow screenshot lovers and
            appreciators. we can&apos;t wait to see you there.
          </p>

          <p className="self-start pb-12">
            -{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/worm_emoji"
            >
              @worm_emoji
            </a>
          </p>

          <p
            className="cursor-pointer"
            onClick={() => {
              setShots(shuffle(screenshots))
            }}
          >
            shuffle order
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {shots.map((post) => {
          return <Screenshot key={post.id} data={post} />
        })}
      </div>
    </div>
  )
}

export default Home
