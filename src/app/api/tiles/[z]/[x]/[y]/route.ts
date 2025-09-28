import { fetchTile } from '@/lib/s3'

export async function GET(
  _: Request,
  context: { params: Promise<{ z: string; x: string; y: string }> },
) {
  const { z, x, y } = await context.params
  const key = `tiles/${z}/${x}/${y}.avif`
  return fetchTile(key)
}
