import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { S3_CONFIG } from '@/config/s3'
import { NextResponse } from 'next/server'

const s3 = new S3Client({
  region: S3_CONFIG.region,
  credentials: {
    accessKeyId: S3_CONFIG.accessKeyId!,
    secretAccessKey: S3_CONFIG.secretAccessKey!,
  },
})

export async function fetchTile(key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_CONFIG.bucket,
      Key: key,
    })

    const data = await s3.send(command)
    const body = await data.Body?.transformToWebStream()

    if (!body) return new NextResponse('Tile not found', { status: 404 })

    const arrayBuffer = await new Response(body).arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/avif' },
    })
  } catch (err) {
    console.error(err)
    return new NextResponse('Tile not found', { status: 404 })
  }
}
