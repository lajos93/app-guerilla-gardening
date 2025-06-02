import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve current script directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// File paths
const SOURCE_FILE = path.join(__dirname, 'sources', 'fruitTreeList.json')
const OUTPUT_DIR = path.join(__dirname, 'results')
const IMAGE_DIR = path.join(OUTPUT_DIR, 'images')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'data.json')

// Read fruit tree data
const raw = await fs.readFile(SOURCE_FILE, 'utf-8')
const fruitTrees = JSON.parse(raw)

// Helper: Delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

await fs.mkdir(IMAGE_DIR, { recursive: true })

let outputData = []
try {
  const existing = await fs.readFile(OUTPUT_FILE, 'utf8')
  outputData = JSON.parse(existing)
} catch {
  console.warn(`⚠️ Not found ${OUTPUT_FILE}`)
  outputData = []
}

async function fetchTreeData(tree, treeIndex, totalTrees) {
  const url = `https://infogardenweb.hu/bpfatar/api/tree/supplies/clusterdata?categoryId=${tree.id}`
  const result = {
    id: tree.id,
    hungarian: tree.hungarian,
    latin: tree.latin,
    supplies: [],
  }

  console.log(`\n🌳 (${treeIndex + 1}/${totalTrees}) Feldolgozás: ${tree.latin} (${tree.id})`)

  try {
    const clusterRes = await axios.get(url)
    const clusterData = clusterRes.data

    console.log(`🔢 ${clusterData.length} találat a fán belül`)

    for (let i = 0; i < clusterData.length; i++) {
      const { supplyId, lat, lon, storeNumber } = clusterData[i]
      console.log(`  🍏 (${i + 1}/${clusterData.length}) Supply: ${supplyId}`)

      let details = null
      try {
        const detailUrl = `https://infogardenweb.hu/bpfatar/api/tree/supplies/${storeNumber}/${supplyId}`
        const detailRes = await axios.get(detailUrl)
        details = detailRes.data
        console.log(`    ✅ Részlet letöltve`)
      } catch (err) {
        console.warn(
          `    ⚠️ Részlet nem jött le (${supplyId}):`,
          err.response?.status || err.message,
        )
      }

      let photoFilename = null
      try {
        const photoUrl = `https://infogardenweb.hu/bpfatar/api/tree/photos/${storeNumber}/${supplyId}/0`
        const photoRes = await axios.get(photoUrl, { responseType: 'arraybuffer' })
        const photoPath = path.join(IMAGE_DIR, `${supplyId}.jpg`)
        await fs.writeFile(photoPath, photoRes.data)
        photoFilename = `${supplyId}.jpg`
        console.log(`    🖼️ Kép mentve: ${photoFilename}`)
      } catch (err) {
        console.warn(`    ⚠️ Kép nem jött le (${supplyId}):`, err.response?.status || err.message)
      }

      result.supplies.push({
        supplyId,
        lat,
        lon,
        storeNumber,
        details,
        photo: photoFilename,
      })

      await delay(300)
    }

    outputData.push(result)
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(outputData, null, 2))
    console.log(`💾 Mentve: ${OUTPUT_FILE}`)
  } catch (err) {
    console.error(`❌ ${tree.id} hibás:`, err.message)
  }
}

async function main() {
  for (let i = 0; i < fruitTrees.length; i++) {
    await fetchTreeData(fruitTrees[i], i, fruitTrees.length)
    await delay(1000)
  }
}

main()
