// blocks/MissionsBlock/fields.ts

import type { Field } from 'payload'

export const MissionsBlockField: Field[] = [
  {
    name: 'backgroundColor',
    label: 'Background Color (hex code or CSS value)',
    type: 'text',
    required: true,
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
]
