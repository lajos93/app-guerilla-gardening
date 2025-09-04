import type { CollectionConfig } from 'payload'
import groupByCountyHandler from '../endpoints/groupByCountyHandler'
import treesLightHandler from '../endpoints/treesLightHandler'
import treesInRadiusHandler from '../endpoints/inRadius'

export const Trees: CollectionConfig = {
  slug: 'trees',
  labels: {
    singular: 'Tree',
    plural: 'Trees',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Tree',
  },
  fields: [
    {
      name: 'supplyId',
      type: 'text',
      unique: true,
    },
    {
      name: 'species',
      type: 'relationship',
      relationTo: 'species',
      required: true,
    },

    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lon',
      type: 'number',
      required: true,
    },
    {
      name: 'county',
      type: 'text',
      label: 'County / Region',
    },
    {
      name: 'storeNumber',
      type: 'number',
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        { name: 'dataOwner', type: 'text' },
        { name: 'height', type: 'number' },
        { name: 'trunkHeight', type: 'number' },
        { name: 'trunkDiameter', type: 'number' },
        { name: 'crownDiameter', type: 'number' },
        { name: 'district', type: 'text' },
        { name: 'street', type: 'text' },
        { name: 'streetNumber', type: 'text' },
        { name: 'parcelNumber', type: 'text' },
        { name: 'fokertId', type: 'text' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  endpoints: [
    {
      path: '/groupByCounty',
      method: 'get',
      handler: groupByCountyHandler,
    },
    {
      path: '/treesLight',
      method: 'get',
      handler: treesLightHandler,
    },
    {
      path: '/in-radius',
      method: 'get',
      handler: treesInRadiusHandler,
    },
  ],
}
