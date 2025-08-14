import type { Block } from 'payload'
import { MissionsBlockField } from '../MissionsBlock/fields'
import { MapBlockField } from '../MapBlock/fields'

const InteractiveMapWithMissions: Block = {
  slug: 'interactiveMapWithMissions',
  fields: [
    {
      name: 'missions',
      type: 'group',
      fields: MissionsBlockField,
    },
    {
      name: 'map',
      type: 'group',
      fields: MapBlockField,
    },
  ],
}

export default InteractiveMapWithMissions
