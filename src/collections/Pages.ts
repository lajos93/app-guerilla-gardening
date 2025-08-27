import { ValidationError, type CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import MapBlock from '../blocks/MapBlock/config'
import HeroBlock from '../blocks/HeroBlock/config'
import AboutBlock from '../blocks/AboutBlock/config'
import MissionsBlock from '../blocks/MissionsBlock/config'
import InteractiveMapWithMissions from '../blocks/InteractiveMapWithMissionsBlock/config'

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
      unique: true,
      label: 'Slug',
      admin: {
        condition: (data) => !data?.isRoot,
        position: 'sidebar',
      },
    },
    {
      name: 'isRoot',
      type: 'checkbox',
      label: 'Set as homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If checked, this page will be used as the homepage ("/").',
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
      blocks: [HeroBlock, AboutBlock, MapBlock, MissionsBlock, InteractiveMapWithMissions],
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data?.isRoot && !data?.slug) {
          throw new ValidationError({
            errors: [
              {
                message: 'Slug is required if this page is not set as homepage',
                path: 'slug',
              },
            ],
          })
        }
      },
    ],
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (data.isRoot) {
          const payload = req.payload

          // look for existing root pages
          const existing = await payload.find({
            collection: 'pages',
            where: {
              isRoot: { equals: true },
            },
          })

          // turn off isRoot for all existing root pages
          await Promise.all(
            existing.docs.map(async (doc) => {
              if (doc.id !== originalDoc?.id) {
                await payload.update({
                  collection: 'pages',
                  id: doc.id,
                  data: { isRoot: false },
                  overrideAccess: true,
                })
              }
            }),
          )
        }

        return data
      },
    ],
  },
}
