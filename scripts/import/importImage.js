import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import FormData from 'form-data'

// __filename and __dirname definitions
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// folder
const testImagesDir = path.resolve(__dirname, '../scrape/results/images-avif')
const apiUrl = 'http://localhost:3000/api/media'

async function uploadAvifFiles() {
  const files = await fs.promises.readdir(testImagesDir)

  const avifFiles = files.filter((file) => file.toLowerCase().endsWith('.avif'))

  if (avifFiles.length === 0) {
    console.log('⚠️ No .avif files found in the directory.')
    return
  }

  console.log(`📂 ${avifFiles.length} .avif file found. Starting upload...\n`)

  for (let i = 0; i < avifFiles.length; i++) {
    const fileName = avifFiles[i]
    const filePath = path.join(testImagesDir, fileName)
    const index = i + 1

    console.log(`📄 [${index}/${avifFiles.length}] Uploading: ${fileName}`)

    const form = new FormData()
    form.append('file', fs.createReadStream(filePath), {
      filename: fileName,
      contentType: 'image/avif',
    })

    try {
      const res = await axios.post(apiUrl, form, {
        headers: form.getHeaders(),
      })
      console.log(`✅ Success: ${fileName} →`, res.data)
    } catch (err) {
      console.error(`❌ Error uploading: ${fileName}`)
      if (err.response) {
        console.error('Status:', err.response.status)
        console.error('Data:', err.response.data)
      } else {
        console.error(err.message)
      }
    }

    console.log('-----------------------------')
  }

  console.log('🏁 All uploads complete.')
}

uploadAvifFiles().catch(console.error)
