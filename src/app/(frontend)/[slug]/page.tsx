import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks, Block } from '../../../blocks/RenderBlocks'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ lang?: string }>
}) {
  const { slug } = await params
  const { lang } = (await searchParams) || {}
  const locale: 'hu' | 'en' = (lang as 'hu' | 'en') || 'hu'

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  })

  const page = result.docs[0]
  if (!page || page.isRoot) return <h1>Page not found</h1>

  return <RenderBlocks blocks={page.layout as Block[]} />
}
