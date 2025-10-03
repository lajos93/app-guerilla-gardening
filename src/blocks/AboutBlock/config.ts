import type { Block } from 'payload'

const AboutBlock: Block = {
  slug: 'about',
  fields: [
    {
      name: 'anchor',
      label: 'Anchor ID',
      type: 'text',
    },
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
      localized: true,
    },
    {
      name: 'titleHighlight',
      type: 'text',
      localized: true,
    },
    {
      name: 'richDescription',
      type: 'richText',
      localized: true,
    },
  ],
}

export default AboutBlock
