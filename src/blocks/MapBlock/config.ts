import type { Block } from 'payload'
import { MapBlockField } from './fields'

const MapBlock: Block = {
  slug: 'map',
  labels: {
    singular: 'Map',
    plural: 'Maps',
  },
  fields: MapBlockField,
}

export default MapBlock
