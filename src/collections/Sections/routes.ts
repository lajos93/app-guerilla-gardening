// app/api/sections/route.ts (Next.js app directory)
import payload from 'payload'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await payload.find({
    collection: 'sections',
    where: { published: { equals: true } },
  })

  return NextResponse.json(result)
}
