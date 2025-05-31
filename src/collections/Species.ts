import type { CollectionConfig } from 'payload'

export const Species: CollectionConfig = {
  slug: 'species',
  labels: {
    singular: 'Species',
    plural: 'Species',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'latinName',
      type: 'text',
    },
  ],
}
