import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks, Block } from '../../../blocks/RenderBlocks'

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { lang?: string }
}) {
  const payload = await getPayload({ config })

  const lang = (searchParams.lang as 'hu' | 'en') || 'hu'

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: params.slug },
    },
    limit: 1,
    locale: lang,
  })

  const page = result.docs[0]

  if (!page || page.isRoot) {
    return <h1>Page not found</h1>
  }

  return <RenderBlocks blocks={page.layout as Block[]} />
}
