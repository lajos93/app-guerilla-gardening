'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Filters } from '.'
import { SpeciesCategory } from './useFiltersLogic'

type Species = {
  id: number
  name: string
  latinName: string
  category?: {
    id: number
    name: string
    latinName: string
    isPriority: boolean
    icon?: { url: string }
    group?: { id: number; name: string }
  }
}

type PaginatedResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

export function FiltersMobile({ onChange }: { onChange: (filters: Filters) => void }) {
  const [open, setOpen] = useState(false)
  const [extraOpen, setExtraOpen] = useState(false) // accordion toggle
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatingCategory, setAnimatingCategory] = useState<string | null>(null)
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

  // ha kiválasztott kategória változik → indítjuk az animációt
  useEffect(() => {
    if (selectedCategory) {
      setAnimatingCategory(selectedCategory)
      const timer = setTimeout(() => {
        applyFilters()
        setAnimatingCategory(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [selectedCategory])

  if (isLoading) return <div className="p-4">Betöltés...</div>
  if (error) return <div className="p-4 text-red-500">Nem sikerült betölteni a kategóriákat</div>

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999]">
      {/* collapsed */}
      {!open && (
        <div
          className="bg-white rounded-t-2xl shadow-lg p-3 text-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-sm font-medium">Szűrők ▲</span>
        </div>
      )}

      {/* expanded */}
      {open && (
        <div className="bg-white rounded-t-2xl shadow-lg p-4 max-h-[80vh] overflow-y-auto space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Szűrők</h2>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Keresés fajra..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setIsOpen(true)
              }}
              onFocus={() => search && setIsOpen(true)}
            />

            {isOpen && search && (
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
                      setIsOpen(false)

                      if (sp.category?.name) {
                        setSelectedCategory(sp.category.name)
                      }

                      if (sp.category?.group?.name) {
                        setCategoryGroups([sp.category.group.name])
                      } else {
                        setCategoryGroups([])
                      }
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
            <div className="grid grid-cols-2 gap-3 mt-2 max-h-[200px] overflow-y-auto pr-1">
              {speciesCategories.map((item) => {
                const active = selectedCategory === item.name
                const animating = animatingCategory === item.name
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.name)
                      if (item.group?.name) {
                        setCategoryGroups([item.group.name])
                      } else {
                        setCategoryGroups([])
                      }
                    }}
                    className={`
            flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 text-xs transition
            ${active ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-gray-400'}
            ${animating ? 'animated-border' : ''}
          `}
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-md">
                      {item.icon?.url ? (
                        <img
                          src={item.icon.url}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">?</span>
                      )}
                    </div>
                    <span className="text-[11px] text-center leading-tight">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Extra (év + groups + district) */}
          <div>
            <button
              className="w-full flex justify-between items-center text-sm font-medium text-gray-700 py-2"
              onClick={() => setExtraOpen((p) => !p)}
            >
              <span>További adatok</span>
              <span>{extraOpen ? '▲' : '▼'}</span>
            </button>

            {extraOpen && (
              <div className="mt-2 space-y-4">
                {/* Groups */}
                <div>
                  <Label className="text-xs text-gray-500 uppercase">Csoportok</Label>
                  <div className="mt-2 space-y-2">
                    {allGroups.map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <Checkbox
                          checked={categoryGroups.includes(g)}
                          onCheckedChange={() => setCategoryGroups([g])}
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
