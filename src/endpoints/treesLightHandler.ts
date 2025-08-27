import type { PayloadHandler } from 'payload'

const treesLightHandler: PayloadHandler = async ({ payload }) => {
  try {
    const trees = await payload.find({
      collection: 'trees',
      limit: 999999,
      depth: 0, // ne töltsük be a kapcsolt dokumentumokat
    })

    // Csak a szükséges mezőket tartjuk meg
    const lightTrees = trees.docs.map((t: any) => ({
      id: t.id,
      lat: t.lat,
      lon: t.lon,
      county: t.county,
    }))

    // A docs tömböt JSON-ban küldjük vissza
    return new Response(JSON.stringify(lightTrees), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'Error fetching lightweight trees' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export default treesLightHandler
