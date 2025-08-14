import type { Block } from 'payload'
import { MissionsBlockField } from './fields'

const MissionsBlock: Block = {
  slug: 'missions',
  fields: MissionsBlockField,
}

export default MissionsBlock
