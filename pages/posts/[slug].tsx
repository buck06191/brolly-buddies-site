import Head from 'next/head'
import * as React from 'react'

import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostUrls, getPostData, PostSlug } from '../../lib/posts'
import { PostData, getBodyComponents } from '../../lib/contentful-posts'
import { logFullObject } from '../../lib/utils'

import utilStyles from '../../styles/utils.module.css'

const Post: React.FC<{ postData: PostData }> = ({ postData }) => {
  console.log('Props: ', postData)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {getBodyComponents(postData.body)}
      </article>
    </Layout>
  )
}

export const getStaticPaths = async (): Promise<{
  paths: Array<PostSlug>
  fallback: boolean
}> => {
  const paths = await getAllPostUrls()
  logFullObject(paths, 'PATHS')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }): Promise<{ props: { postData: PostData } } | void> => {
  try {
    const post = await getPostData(params.slug)
    const postData = post.pop()
    if (postData)
      return {
        props: {
          postData
        }
      }
  } catch {
    console.error("Couldn't fetch post")
  }
}

export default Post
