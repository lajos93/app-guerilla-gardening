import type { GlobalConfig } from 'payload'

export const Logo: GlobalConfig = {
  slug: 'logo',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
      required: true,
    },
  ],
}
