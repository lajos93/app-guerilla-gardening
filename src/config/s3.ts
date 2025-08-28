// config/s3.ts
if (!process.env.S3_BUCKET) throw new Error('S3_BUCKET env var is required')
if (!process.env.S3_REGION) throw new Error('S3_REGION env var is required')
if (!process.env.S3_ACCESS_KEY_ID) throw new Error('S3_ACCESS_KEY_ID env var is required')
if (!process.env.S3_SECRET_ACCESS_KEY) throw new Error('S3_SECRET_ACCESS_KEY env var is required')

export const S3_CONFIG = {
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
}
