import { fetchContentfulEntries, ContentType, PostData, fetchContentfulEntry } from './contentful-posts'
import { removeUndefinedFields } from '../lib/utils'

export interface PostSlug {
  params: {
    slug: string
  }
}

export type SortedPostsData = Array<PostData>

export const parsePost = (entry: ContentType): PostData => {
  const { sys, fields } = entry
  return removeUndefinedFields({
    title: fields.title,
    date: fields.date,
    body: fields.body,
    coverImage: fields?.coverImage?.fields?.file,
    alt: fields?.alt,
    slug: fields.slug
  })
}

export const getPostData = async (slug: string): Promise<PostData[]> => {
  const entries = await fetchContentfulEntry(slug)
  return entries.map((entry) => parsePost(entry))
}

export const getSortedPostsData = async (): Promise<SortedPostsData> => {
  const entries = await fetchContentfulEntries()
  const allPostsData = await Promise.all(entries.map(async (entry: ContentType) => await getPostData(entry.fields.slug)))
  return allPostsData.flat().sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostUrls = async (): Promise<Array<PostSlug>> => {
  const entries = await getSortedPostsData()
  return entries.map((post: PostData) => {
    return {
      params: {
        slug: post.slug
      }
    }
  })
}
