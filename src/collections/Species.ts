import type { CollectionConfig } from 'payload'
import searchSpeciesHandler from '../endpoints/searchCategoriesHandler'

export const Species: CollectionConfig = {
  slug: 'species',
  labels: {
    singular: 'Species',
    plural: 'Species',
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

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'species-categories',
      // required:true
    },
  ],
  endpoints: [
    {
      path: '/search',
      method: 'get',
      handler: searchSpeciesHandler,
    },
  ],
}
