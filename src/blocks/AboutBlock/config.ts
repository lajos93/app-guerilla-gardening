import type { Block } from 'payload'

const AboutBlock: Block = {
  slug: 'about',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background Color (hex code or CSS value)',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'titleHighlight',
      type: 'text',
    },
    {
      name: 'richDescription',
      type: 'richText',
    },
    {
      name: 'missionTitle',
      type: 'text',
    },
    {
      name: 'missionItems',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}

export default AboutBlock
