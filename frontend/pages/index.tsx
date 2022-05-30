import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { Screenshot } from '../components/Screenshot'
import { posts } from '../data/posts'

export async function getServerSideProps() {
  return {
    props: {
      screenshots: posts,
    },
  }
}

function Home({
  screenshots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
          <p>
            i&apos;ve been collecting screenshots on{' '}
            <a
              className="underline"
              href="https://luke.cat"
              target="_blank"
              rel="noreferrer"
            >
              luke.cat
            </a>{' '}
            for the past few years. now, you can own any screenshot from the
            catalog of {screenshots.length} NFTs.
          </p>
          <p className="self-start">
            -{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/worm_emoji"
            >
              @worm_emoji
            </a>
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {screenshots.map((post) => {
          return <Screenshot key={post.id} data={post} />
        })}
      </div>
    </div>
  )
}

export default Home
