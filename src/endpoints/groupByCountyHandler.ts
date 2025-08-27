import type { PayloadHandler } from 'payload'

const groupByCountyHandler: PayloadHandler = async ({ payload }) => {
  const trees = await payload.find({
    collection: 'trees',
    limit: 50000, // csak a számoláshoz kell
  })

  const grouped: Record<string, number> = {}
  trees.docs.forEach((tree: any) => {
    const county = tree.county === 'Budapest' ? 'Budapest' : tree.county || 'Ismeretlen'
    grouped[county] = (grouped[county] || 0) + 1
  })

  const result = Object.entries(grouped).map(([county, trees]) => ({
    county,
    trees,
  }))
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export default groupByCountyHandler
