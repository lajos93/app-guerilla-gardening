// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Species } from './collections/Species'
import { Trees } from './collections/Trees'
import { Pages } from './collections/Pages'
import { Sections } from './collections/Sections'
import { SpeciesCategories } from './collections/Species-Categories'
import { CategoryGroups } from './collections/Category-Groups'

import { S3_CONFIG } from './config/s3'
import { Theme } from './globals/Theme'
import { Logo } from './globals/Logo'
import Navigation from './collections/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Navigation,
    Users,
    Media,
    Species,
    Trees,
    Pages,
    Sections,
    SpeciesCategories,
    CategoryGroups,
  ],
  globals: [Logo, Theme],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: { prefix: 'images' },
      },
      bucket: S3_CONFIG.bucket,
      config: {
        region: S3_CONFIG.region,
        credentials: {
          accessKeyId: S3_CONFIG.accessKeyId,
          secretAccessKey: S3_CONFIG.secretAccessKey,
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})
