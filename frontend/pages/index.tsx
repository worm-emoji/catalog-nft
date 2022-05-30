import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { Screenshot } from '../components/Screenshot'
import { Data, posts } from '../data/posts'

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
        <title>mint.luke.cat</title>
      </Head>
      <div className="grid sm:grid-cols-2 gap-2">
        {screenshots.map((post) => {
          return <Screenshot key={post.id} data={post} />
        })}
      </div>
    </div>
  )
}

export default Home
