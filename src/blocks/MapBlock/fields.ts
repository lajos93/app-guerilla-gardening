// blocks/MissionsBlock/fields.ts

import type { Field } from 'payload'

export const MapBlockField: Field[] = [
  {
    name: 'titleBackgroundColor',
    label: 'Title Background Color (hex code or CSS value)',
    type: 'text',
  },
  { name: 'titleTextColor', label: 'Title Text Color (hex code or CSS value)', type: 'text' },
  {
    name: 'extendedTitleTextColor',
    label: 'Extended Title Text Color (hex code or CSS value)',
    type: 'text',
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
  {
    name: 'sections',
    type: 'relationship',
    relationTo: 'sections',
  },
  {
    name: 'latitude',
    type: 'number',
    required: true,
    label: 'Latitude',
  },
  {
    name: 'longitude',
    type: 'number',
    required: true,
    label: 'Longitude',
  },
  {
    name: 'zoomLevel',
    type: 'number',
    required: true,
    label: 'Zoom Level',
    defaultValue: 12,
  },
  {
    name: 'markerLabel',
    type: 'text',
    label: 'Marker Label',
  },
]
