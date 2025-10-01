'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export type Filters = {
  search: string
  prioritySpecies: string[]
  speciesCategories: string[]
  categoryGroups: string[]
  year: number[]
  district: string
}

export type SpeciesCategory = {
  id: number
  name: string
  latinName: string
  isPriority: boolean
  icon?: { url: string }
  group: { id: number; name: string }
}

type Species = {
  id: number
  name: string
  latinName: string
}

type PaginatedResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

export function FiltersDesktop({ onChange }: { onChange: (filters: Filters) => void }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryGroups, setCategoryGroups] = useState<string[]>([])
  const [year, setYear] = useState([2000])
  const [district, setDistrict] = useState('')

  // species categories lekérés
  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery<{ docs: SpeciesCategory[] }>({
    queryKey: ['species-categories'],
    queryFn: async () => {
      const res = await fetch(`/api/species-categories?limit=50&sort=name`)
      if (!res.ok) throw new Error('Hiba a lekérésnél')
      return res.json()
    },
  })

  // species keresés autocomplete
  const {
    data: speciesData,
    isLoading: isSpeciesLoading,
    error: speciesError,
  } = useQuery<PaginatedResponse<Species>>({
    queryKey: ['species', search],
    queryFn: async () => {
      if (!search) {
        return { docs: [], totalDocs: 0, limit: 20, page: 1, totalPages: 1 }
      }

      const url = `/api/species/search?search=${search}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Hiba a keresésnél')
      return res.json()
    },
    enabled: !!search,
  })

  const speciesSearchResults = speciesData?.docs ?? []

  const speciesCategories = categoriesData?.docs ?? []
  const allGroups = Array.from(new Set(speciesCategories.map((s) => s.group?.name).filter(Boolean)))

  const toggleItem = (item: string) => {
    setCategoryGroups((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    )
  }

  const applyFilters = () => {
    onChange({
      search,
      prioritySpecies: [],
      speciesCategories: selectedCategory ? [selectedCategory] : [],
      categoryGroups,
      year,
      district,
    })
  }

  if (isLoading) return <div className="p-4">Betöltés...</div>
  if (error) return <div className="p-4 text-red-500">Nem sikerült betölteni a kategóriákat</div>

  return (
    <div className="w-72 p-4 rounded-2xl shadow bg-white max-h-[90vh] overflow-y-auto text-sm space-y-6">
      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Keresés fajra..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Autocomplete list */}
        {search && (
          <div className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 shadow max-h-60 overflow-y-auto z-10">
            {isSpeciesLoading && <div className="p-2 text-sm text-gray-500">Keresés...</div>}

            {speciesError && <div className="p-2 text-sm text-red-500">Hiba a keresésnél</div>}

            {!isSpeciesLoading && !speciesError && speciesSearchResults.length === 0 && (
              <div className="p-2 text-sm text-gray-500">Nincs találat</div>
            )}

            {speciesSearchResults.map((sp) => (
              <button
                key={sp.id}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSearch(sp.name)
                  // ha kell, ide rakhatod az applyFilters()-t
                }}
              >
                <div className="font-medium">{sp.name}</div>
                <div className="text-xs text-gray-500 italic">{sp.latinName}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Kategória</Label>
        <div className="mt-2 max-h-64 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3 p-1">
            {speciesCategories.map((item) => {
              const active = selectedCategory === item.name
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.name)}
                  className={`
                    flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-sm transition
                    ring-2 ring-offset-2
                    ${
                      active
                        ? 'bg-green-50 border-green-500 ring-green-400 ring-offset-white shadow-lg'
                        : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50 ring-transparent'
                    }
                  `}
                >
                  {item.icon?.url ? (
                    <img src={item.icon.url} alt={item.name} className="w-14 h-14 object-contain" />
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-400 rounded-md">
                      ?
                    </div>
                  )}
                  <span className="text-xs text-center leading-tight">{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Csoportok</Label>
        <div className="mt-2 space-y-1">
          {allGroups.map((g) => (
            <label key={g} className="flex items-center gap-2">
              <Checkbox
                checked={categoryGroups.includes(g)}
                onCheckedChange={() => toggleItem(g)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Ültetési év</Label>
        <Slider min={1900} max={2025} step={1} value={year} onValueChange={setYear} />
        <div className="text-xs text-gray-500 mt-1">{year[0]}+</div>
      </div>

      <Button className="w-full mt-4" onClick={applyFilters}>
        Szűrés
      </Button>
    </div>
  )
}
