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
      type: 'relationship',
      relationTo: 'sections',
      hasMany: true,
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      label: 'Show divider',
      defaultValue: true,
      admin: {
        description:
          'Toggle to show or hide the divider after this block that connects with the next block.',
      },
    },
  ],
}

export default AboutBlock
