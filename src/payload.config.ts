// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Environment variables for S3 storage

const bucket = process.env.S3_BUCKET
if (!bucket) throw new Error('S3_BUCKET env var is required')

const region = process.env.S3_REGION
if (!region) throw new Error('S3_REGION env var is required')

const accessKeyId = process.env.S3_ACCESS_KEY_ID
if (!accessKeyId) throw new Error('S3_ACCESS_KEY_ID env var is required')

const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
if (!secretAccessKey) throw new Error('S3_SECRET_ACCESS_KEY env var is required')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Species, Trees],
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
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket,
      config: {
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})
