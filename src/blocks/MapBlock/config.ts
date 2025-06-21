import type { Block } from 'payload'

const MapBlock: Block = {
  slug: 'map',
  labels: {
    singular: 'Map',
    plural: 'Maps',
  },
  fields: [
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
  ],
}

export default MapBlock
