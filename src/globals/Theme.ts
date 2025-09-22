import type { GlobalConfig } from 'payload'
import { colors } from '../config/colors'

export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme Settings',
  fields: Object.entries(colors).map(([key, value]) => ({
    name: key,
    type: 'text',
    defaultValue: value,
    placeholder: value,
    admin: {
      description: `Hex color code, e.g. ${value}`,
      width: '50%',
    },
  })),
}
