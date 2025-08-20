export type SpeciesType = {
  id: number
  name: string
  latinName: string
}

export type TreeType = {
  id: number
  species: SpeciesType
  lat: number
  lon: number
  supplyId: string
  storeNumber: number
}
