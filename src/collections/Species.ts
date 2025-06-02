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
      name: 'bpId', // <-- your original ID here
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Original ID from JSON data',
      },
    },
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
