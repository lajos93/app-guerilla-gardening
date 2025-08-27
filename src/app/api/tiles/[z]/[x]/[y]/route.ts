/* // src/app/api/tiles/[z]/[x]/[y]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(
  req: NextRequest,
  { params }: { params: { z: string; x: string; y: string } },
) {
  const { z, x, y } = params
  console.log('Tile API hívás érkezett:', { z, x, y })

  // Dinamikus import a canvas-hoz
  let createCanvas: typeof import('canvas').createCanvas | null = null
  try {
    ;({ createCanvas } = await import('canvas'))
  } catch (err) {
    console.error('Canvas import hiba:', err)
    return new NextResponse('Canvas nem elérhető', { status: 500 })
  }

  const tileSize = 256
  const n = 2 ** Number(z)
  const lon_left = (Number(x) / n) * 360 - 180
  const lon_right = ((Number(x) + 1) / n) * 360 - 180
  const lat_top = (Math.atan(Math.sinh(Math.PI * (1 - (2 * Number(y)) / n))) * 180) / Math.PI
  const lat_bottom =
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * (Number(y) + 1)) / n))) * 180) / Math.PI

  const query = `?limit=5000&where[lat][greater_than_equal]=${lat_bottom}&where[lat][less_than_equal]=${lat_top}&where[lon][greater_than_equal]=${lon_left}&where[lon][less_than_equal]=${lon_right}`

  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/trees${query}`)
  const data = await res.json()

  const trees = data.docs // itt van a dokumentumok tömbje

  // Canvas létrehozása
  const canvas = createCanvas(tileSize, tileSize)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, tileSize, tileSize)

  // Fák kirajzolása
  trees.forEach((tree: any) => {
    const px = ((tree.lon - lon_left) / (lon_right - lon_left)) * tileSize
    const py = ((lat_top - tree.lat) / (lat_top - lat_bottom)) * tileSize

    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(px, py, 2, 0, 2 * Math.PI)
    ctx.fill()
  })

  return new NextResponse(Buffer.from(canvas.toBuffer()), {
    headers: { 'Content-Type': 'image/png' },
  })
}
 */
