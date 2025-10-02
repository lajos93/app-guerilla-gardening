import type { PayloadHandler } from 'payload'

const searchSpeciesHandler: PayloadHandler = async ({ payload, query }) => {
  try {
    const { search } = query

    if (!search || typeof search !== 'string') {
      return new Response(JSON.stringify({ message: 'Missing search param' }), {
        status: 400,
      })
    }

    const results = await payload.find({
      collection: 'species',
      where: {
        or: [{ name: { like: search } }, { latinName: { like: search } }],
      },
      depth: 2,
      limit: 50,
    })

    return new Response(JSON.stringify(results))
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'Server Error' }), {
      status: 500,
    })
  }
}
export default searchSpeciesHandler
