import type { CollectionConfig } from 'payload'

export const SpeciesCategoryIcons: CollectionConfig = {
  slug: 'species-category-icons',
  labels: {
    singular: 'Species Category Icon',
    plural: 'Species Category Icons',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'icon',
        width: 128,
        height: 128,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
  },
  fields: [],
}
