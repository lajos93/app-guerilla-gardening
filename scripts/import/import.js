import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const toSnakeCase = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase()

// __filename and __dirname definitions for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const skipDetailsKeys = [
  'id',
  'notable',
  'webpage',
  'dataVariant',
  'planter',
  'planterWebpage',
  'calculatedValue',
  'treeCategory',
]

const flattenTree = (tree, speciesId, photoId) => {
  const { details, ...rest } = tree
  const flatDetails = {}

  for (const key in details) {
    if (skipDetailsKeys.includes(key)) continue
    flatDetails[`details_${toSnakeCase(key)}`] = details[key]
  }

  return {
    supply_id: tree.supplyId,
    lat: tree.lat,
    lon: tree.lon,
    store_number: tree.storeNumber,
    photo_id: photoId, // here assign the found media id
    species_id: speciesId,
    ...flatDetails,
  }
}

const main = async () => {
  const dataPath = path.resolve(__dirname, '../scrape/results/data.json')

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Data file not found. Run scrape script (`fetchTrees.js`) first.')
    process.exit(1)
  }

  const raw = fs.readFileSync(dataPath, 'utf-8')
  const speciesArray = JSON.parse(raw)

  const speciesIdMap = new Map()

  for (const species of speciesArray) {
    // Insert species with original bpId
    const { data: insertedSpecies, error: speciesError } = await supabase
      .from('species')
      .insert({
        bp_id: species.id,
        name: species.hungarian,
        latin_name: species.latin,
      })
      .select('id, bp_id')

    if (speciesError) {
      console.error('❌ Failed to insert species:', species.hungarian, speciesError.message)
      continue
    }

    const payloadSpeciesId = insertedSpecies[0].id
    speciesIdMap.set(species.id, payloadSpeciesId)

    // Insert trees for this species
    for (const tree of species.supplies) {
      // Find media where file_id == supplyId
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .select('id, file_id')
        .eq('file_id', tree.supplyId)
        .single()

      if (mediaError) {
        console.warn(`⚠️ Media not found for supplyId ${tree.supplyId}:`, mediaError.message)
      }

      const photoId = mediaData ? mediaData.id : null

      const flatTree = flattenTree(tree, payloadSpeciesId, photoId)

      const { error } = await supabase.from('trees').insert(flatTree)

      if (error) {
        console.error('❌ Failed to insert tree', flatTree.supply_id, error.message)
      } else {
        console.log('✅ Inserted tree', flatTree.supply_id)
      }
    }
  }

  process.exit(0)
}

main()
