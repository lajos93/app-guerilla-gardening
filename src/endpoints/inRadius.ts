import type { PayloadHandler } from 'payload'
import { Pool } from 'pg'

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
})

const treesInRadiusHandler: PayloadHandler = async ({ query }) => {
  try {
    const lat = parseFloat((query.lat as string) || '')
    const lon = parseFloat((query.lon as string) || '')
    const radius = parseFloat((query.radius as string) || '')
    const page = parseInt((query.page as string) || '1', 10)
    const pageSize = parseInt((query.pageSize as string) || '100', 10)

    // Validáció
    if (
      isNaN(lat) ||
      isNaN(lon) ||
      isNaN(radius) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180 ||
      radius <= 0 ||
      radius > 50 ||
      isNaN(page) ||
      page < 1 ||
      isNaN(pageSize) ||
      pageSize < 1 ||
      pageSize > 1000
    ) {
      return new Response(JSON.stringify({ message: 'Invalid query parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Bounding box (approximate)
    const radiusDeg = radius / 111 // 1 fok ≈ 111 km
    const minLat = lat - radiusDeg
    const maxLat = lat + radiusDeg
    const minLon = lon - radiusDeg
    const maxLon = lon + radiusDeg

    const offset = (page - 1) * pageSize

    // Egyetlen query, total és rows együtt
    const sql = `
      WITH filtered AS (
        SELECT id, lat, lon, county,
          (6371 * 2 *
            ATAN2(
              SQRT(
                SIN(RADIANS(lat - $1)/2)^2 +
                COS(RADIANS($1)) * COS(RADIANS(lat)) * SIN(RADIANS(lon - $2)/2)^2
              ),
              SQRT(
                1 - (
                  SIN(RADIANS(lat - $1)/2)^2 +
                  COS(RADIANS($1)) * COS(RADIANS(lat)) * SIN(RADIANS(lon - $2)/2)^2
                )
              )
            )
          ) AS distance
        FROM trees
        WHERE lat BETWEEN $3 AND $4
          AND lon BETWEEN $5 AND $6
      )
      SELECT *, COUNT(*) OVER() AS total
      FROM filtered
      WHERE distance <= $7
      ORDER BY id
      LIMIT $8 OFFSET $9
    `
    const { rows } = await pool.query(sql, [
      lat,
      lon,
      minLat,
      maxLat,
      minLon,
      maxLon,
      radius,
      pageSize,
      offset,
    ])

    const total = rows.length > 0 ? parseInt(rows[0].total, 10) : 0

    // Return
    return new Response(
      JSON.stringify({
        total,
        page,
        pageSize,
        trees: rows.map((r) => ({
          id: r.id,
          lat: r.lat,
          lon: r.lon,
          county: r.county,
        })),
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'Error fetching trees in radius' }), {
      status: 500,
    })
  }
}

export default treesInRadiusHandler
