import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { createClient, Asset } from 'contentful'

const envVars = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || ''
}

const client = createClient(envVars)

const contentfulBase = 'https://cdn.contentful.com'

export interface ContentFields {
  title: string
  slug: string
  date: string
  body: Document
  coverImage?: Asset
  alt?: string
}

export interface PostData extends Omit<ContentFields, 'coverImage'> {
  coverImage?: Asset['fields']['file']
}

// Redefine ContentType for better typechecking
export interface ContentType {
  sys: { id: string }
  fields: ContentFields
}

export const fetchContentfulEntries = async (): Promise<ContentType[]> => {
  const entries = await client.getEntries()
  return entries.items as ContentType[]
}

export const fetchContentfulEntry = async (slug: string): Promise<ContentType[]> => {
  const entries = await client.getEntries({ content_type: 'post', 'fields.slug': slug })
  return entries.items as ContentType[]
}

export const getBodyComponents = (body: Document) => {
  return documentToReactComponents(body)
}
