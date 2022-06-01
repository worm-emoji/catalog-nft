import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getAllPosts, Data } from '../../data/posts'
import fs from 'fs'
import { Screenshot } from '../../components/Screenshot'
import Head from 'next/head'
import Link from 'next/link'

type Post = {
  author: string
  content: string
}

export async function getStaticPaths() {
  const { allPosts } = await getAllPosts()
  fs.writeFileSync('/tmp/posts.json', JSON.stringify(allPosts))
  return {
    paths: Object.keys(allPosts).map((id) => ({ params: { id } })),
    fallback: true, // false or 'blocking'
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const allPosts: { [id: string]: Data } = JSON.parse(
    fs.readFileSync('/tmp/posts.json', 'utf8'),
  )
  return {
    props: {
      post: allPosts[String(context.params?.id)],
    },
  }
}

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div>
      <Head>
        <title>mint from the screenshot catalog</title>
        <meta
          property="og:description"
          content="i've been collecting screenshots on luke.cat for the past few years. now, you can own any screenshot from the catalog as an NFT."
        />
        <meta name="twitter:title" content={post.name} />
        <meta property="og:image" content={post.image} />
      </Head>
      <div className="flex w-100 justify-center">
        <div className="px-2 py-5 flex flex-col justify-center items-center w-100 max-w-xl text-white ">
          <h2 className="text-2xl text-center">{post.name}</h2>
        </div>
      </div>
      <Screenshot key={post.id} data={post} isIndex />

      <p className="text-center text-white underline-offset-2 underline pt-12">
        <Link href="/">
          <a>see more screenshots</a>
        </Link>
      </p>
    </div>
  )
}

export default Post
