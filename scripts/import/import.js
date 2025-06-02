import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const toSnakeCase = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase()

// __filename és __dirname definiálása ESM-ben
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

const flattenTree = (tree, speciesId) => {
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
    photo: tree.photo,
    species_id: speciesId,
    ...flatDetails,
  }
}

const main = async () => {
  const dataPath = path.resolve(__dirname, '../scrape/results/data.json')

  // Check if the data file exists
  if (!fs.existsSync(dataPath)) {
    console.error(
      '❌ Nem található a scrape eredménye. Futtasd le előbb a scrape scriptet (`fetchTrees.js`).',
    )
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
      .select('id, bp_id') // get the generated internal Payload ID

    if (speciesError) {
      console.error('❌ Failed to insert species:', species.hungarian, speciesError.message)
      continue
    }

    const payloadSpeciesId = insertedSpecies[0].id
    speciesIdMap.set(species.id, payloadSpeciesId)

    // Insert trees for this species
    for (const tree of species.supplies) {
      const flatTree = flattenTree(tree, payloadSpeciesId)
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
