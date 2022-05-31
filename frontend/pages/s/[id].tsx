import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { allPosts } from '../../data/posts'
import { Screenshot } from '../../components/Screenshot'
import Head from 'next/head'
import Link from 'next/link'

type Post = {
  author: string
  content: string
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(allPosts).map((id) => ({ params: { id } })),
    fallback: true, // false or 'blocking'
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      post: allPosts[String(context.params?.id)],
    },
  }
}

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <div className="px-2 py-5 flex flex-col justify-center items-center w-100 max-w-xl gap-5 text-white pb-12">
          <h2 className="text-2xl">{post.name}</h2>
          <Screenshot key={post.id} data={post} />
        </div>
      </div>
      <p className="text-center text-white underline-offset-2 underline">
        <Link href="/">
          <a>see more screenshots</a>
        </Link>
      </p>
    </div>
  )
}

export default Post
