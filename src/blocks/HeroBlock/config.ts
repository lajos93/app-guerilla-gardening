import type { Block } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'anchor',
      label: 'Anchor ID',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'lowResBackgroundImageBase64',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'ctaButtons',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'target',
          type: 'text',
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

export default HeroBlock
