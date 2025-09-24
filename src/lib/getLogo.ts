import payload from 'payload'

export async function getLogo() {
  const logo = await payload.findGlobal({
    slug: 'logo',
  })

  return logo
}
