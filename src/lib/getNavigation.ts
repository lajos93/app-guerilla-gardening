import payload from 'payload'

export async function getNavigation() {
  const nav = await payload.find({
    collection: 'navigation',
    sort: 'order',
  })

  return nav.docs
}
