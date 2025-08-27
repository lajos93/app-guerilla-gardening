import { getPayload } from 'payload'
import config from '@/payload.config'
import { Block, RenderBlocks } from '../../blocks/RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      isRoot: {
        equals: true,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    return <h1>No homepage set</h1>
  }

  return (
    <>
      <RenderBlocks blocks={page.layout as Block[]} />
    </>
  )
}
