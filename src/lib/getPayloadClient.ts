// src/lib/getPayloadClient.ts
import payload, { Payload } from 'payload'
import config from '@payload-config'

let cached: Payload | null = null

export async function getPayloadClient() {
  if (cached) return cached

  cached = await payload.init({
    config,
  })

  return cached
}
