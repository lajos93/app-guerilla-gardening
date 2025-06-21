import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '../../../blocks/RenderBlocks'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    return <h1>Page not found</h1>
  }

  return (
    <article>
      <h1>{page.title || 'Untitled'}</h1>
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}
