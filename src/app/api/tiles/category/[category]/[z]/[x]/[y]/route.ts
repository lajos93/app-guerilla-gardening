import { fetchTile } from '@/lib/s3'
import { slugify } from '@/lib/slugify'

export async function GET(
  _: Request,
  context: { params: Promise<{ category: string; z: string; x: string; y: string }> },
) {
  const { category, z, x, y } = await context.params

  const safeCategory = slugify(category)
  const key = `tiles/category/${safeCategory}/${z}/${x}/${y}.avif`

  return fetchTile(key)
}
