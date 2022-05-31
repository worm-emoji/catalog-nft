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
      <div className="flex flex-col w-100 justify-center items-center">
        <div className="px-2 py-5 flex flex-col justify-center  w-100 max-w-xl text-white ">
          <h2 className="text-2xl text-center">{post.name}</h2>
        </div>
        <div className="flex items-center justify-center max-w-lg">
          <Screenshot key={post.id} data={post} isIndex />
        </div>
      </div>

      <p className="text-center text-white underline-offset-2 underline pt-12">
        <Link href="/">
          <a>see more screenshots</a>
        </Link>
      </p>
    </div>
  )
}

export default Post
