import type { CollectionConfig } from 'payload'

export const SpeciesCategories: CollectionConfig = {
  slug: 'species-categories',
  labels: {
    singular: 'Species Category',
    plural: 'Species Categories',
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
    {
      name: 'latinName',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'category-groups',
      // required: true,
    },
  ],
}
