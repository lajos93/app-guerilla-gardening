import payload from 'payload'

export async function getNavigation(lang: 'hu' | 'en') {
  const nav = await payload.find({
    collection: 'navigation',
    sort: 'order',
    locale: lang,
  })

  return nav.docs
}
