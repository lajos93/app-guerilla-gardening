// app/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Block, RenderBlocks } from '../../blocks/RenderBlocks'

export default async function HomePage({ searchParams }: { searchParams: { lang?: string } }) {
  const payload = await getPayload({ config })

  // query stringből olvassuk a nyelvet (?lang=hu vagy ?lang=en)
  const lang = (searchParams.lang as 'hu' | 'en') || 'hu'

  const result = await payload.find({
    collection: 'pages',
    where: { isRoot: { equals: true } },
    limit: 1,
    locale: lang,
  })

  const page = result.docs[0]

  if (!page) {
    return <h1>No homepage set</h1>
  }

  return <RenderBlocks blocks={page.layout as Block[]} />
}
