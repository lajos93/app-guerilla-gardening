import type { CollectionConfig } from 'payload'

export const CategoryGroups: CollectionConfig = {
  slug: 'category-groups',
  labels: {
    singular: 'Category Group',
    plural: 'Category Groups',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Tree',
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
  ],
}
