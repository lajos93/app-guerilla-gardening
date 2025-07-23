import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import MapBlock from '../blocks/MapBlock/config'
import HeroBlock from '../blocks/HeroBlock/config'
import AboutBlock from '../blocks/AboutBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, AboutBlock, MapBlock],
    },
  ],
}
