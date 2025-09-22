// src/lib/getTheme.ts
import { getPayloadClient } from './getPayloadClient'
// fetch the "Theme" global from Payload , located in src/globals/theme.ts
// returns an object with the color values defined in the global

export async function getTheme() {
  const payload = await getPayloadClient()

  return await payload.findGlobal({
    slug: 'theme',
  })
}
