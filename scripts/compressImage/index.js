import fs from 'fs/promises' // For file system operations, promise-based
import path from 'path' // For handling file paths
import sharp from 'sharp' // Image processing library
import pLimit from 'p-limit' // To limit concurrency of async tasks

const inputDir = './scripts/scrape/results/images'
const outputDir = './scripts/scrape/results/images-avif'

const concurrency = 12
const maxSize = 1000
const quality = 40

// Shared progress counter
let processedCount = 0

async function convertImage(fileName, index, total) {
  const inputPath = path.join(inputDir, fileName)
  const outputPath = path.join(outputDir, fileName.replace(/\.[^.]+$/, '.avif'))

  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    let { width, height } = metadata
    let newWidth = width
    let newHeight = height

    if (width > height && width > maxSize) {
      newWidth = maxSize
      newHeight = Math.round((height / width) * maxSize)
    } else if (height >= width && height > maxSize) {
      newHeight = maxSize
      newWidth = Math.round((width / height) * maxSize)
    }

    await image.resize(newWidth, newHeight).avif({ quality, effort: 4 }).toFile(outputPath)

    processedCount++
    console.log(`✅ [${processedCount}/${total}] ${fileName} ➜ ${newWidth}x${newHeight} px (AVIF)`)
  } catch (err) {
    console.error(`❌ Error converting ${fileName}:`, err)
  }
}

async function run() {
  try {
    await fs.mkdir(outputDir, { recursive: true })

    const files = (await fs.readdir(inputDir)).filter((f) => /\.(jpe?g)$/i.test(f))
    const limit = pLimit(concurrency)

    const totalFiles = files.length

    const tasks = files.map((file, index) => limit(() => convertImage(file, index + 1, totalFiles)))
    await Promise.all(tasks)

    console.log('🎉 All images processed.')
  } catch (err) {
    console.error('Fatal error:', err)
  }
}

run()
