import type { CollectionConfig } from 'payload'

const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Navigation Item',
    plural: 'Navigation Items',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'url', 'order'],
    group: 'Navigation',
  },
}

export default Navigation
