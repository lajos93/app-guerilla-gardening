'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export type Filters = {
  search: string
  prioritySpecies: string[]
  speciesCategories: string[]
  categoryGroups: string[]
  year: number[]
  district: string
}

type SpeciesCategory = {
  id: number
  name: string
  latinName: string
  isPriority: boolean
  group: { id: number; name: string }
}

type Species = {
  id: number
  name: string
  latinName: string
}

export function MapFilters({ onChange }: { onChange: (filters: Filters) => void }) {
  const [search, setSearch] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([])
  const [prioritySpecies, setPrioritySpecies] = useState<string[]>([])
  const [categoryGroups, setCategoryGroups] = useState<string[]>([])
  const [year, setYear] = useState([2000])
  const [district, setDistrict] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // species-categories fetch
  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery<{
    docs: SpeciesCategory[]
  }>({
    queryKey: ['species-categories'],
    queryFn: async () => {
      const url = `/api/species-categories?limit=50&sort=name`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Hiba a lekérésnél')
      return res.json()
    },
  })

  const speciesCategories = categoriesData?.docs ?? []
  const allGroups = Array.from(new Set(speciesCategories.map((s) => s.group?.name).filter(Boolean)))

  // species search (search barhoz)
  const { data: speciesSearchResults = [] } = useQuery<
    { docs: Species[] }, // queryFn visszatérési típus
    Error,
    Species[] // select utáni "data" típus
  >({
    queryKey: ['species', search],
    queryFn: async () => {
      const url = `/api/species?limit=20&where[or][0][name][like]=${search}&where[or][1][latinName][like]=${search}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Hiba a keresésnél')
      return res.json()
    },
    enabled: !!search,
    select: (data) => data.docs, // innen jön a Species[]
  })

  const toggleItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    setList((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))
  }

  const handleSelect = (s: Species) => {
    if (!selectedSpecies.find((sp) => sp.id === s.id)) {
      setSelectedSpecies((prev) => [...prev, s])
    }
    setSearch('')
    setIsOpen(false)
  }

  const applyFilters = () => {
    onChange({
      search,
      prioritySpecies,
      speciesCategories: speciesCategories.map((s) => s.name),
      categoryGroups,
      year,
      district,
    })
  }

  if (isLoading) {
    return <div className="p-4">Betöltés...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Nem sikerült betölteni a kategóriákat</div>
  }

  return (
    <div className="w-72 p-4 rounded-2xl shadow bg-white max-h-[90vh] overflow-y-auto text-sm space-y-6">
      {/* Search bar + autocomplete */}
      <div className="relative">
        <Input
          id="search"
          placeholder="Keresés fajra..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
        />

        {/* kiválasztott fajok chipként */}
        {selectedSpecies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSpecies.map((s) => (
              <span
                key={s.id}
                className="px-2 py-1 bg-gray-200 rounded-full text-xs flex items-center gap-1"
              >
                {s.name}
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => setSelectedSpecies((prev) => prev.filter((x) => x.id !== s.id))}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* dropdown */}
        {isOpen && speciesSearchResults.length > 0 && (
          <ul className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto border rounded-md bg-white shadow text-sm">
            {speciesSearchResults.map((s) => (
              <li
                key={s.id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                {s.name} <span className="text-gray-500 italic">({s.latinName})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Összes faj lista (gombokkal) */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Fajok</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {speciesCategories.map((item) => (
            <Button
              key={item.id}
              variant={prioritySpecies.includes(item.name) ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => toggleItem(prioritySpecies, setPrioritySpecies, item.name)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Category groups */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Csoportok</Label>
        <div className="mt-2 space-y-1">
          {allGroups.map((g) => (
            <label key={g} className="flex items-center gap-2">
              <Checkbox
                checked={categoryGroups.includes(g)}
                onCheckedChange={() => toggleItem(categoryGroups, setCategoryGroups, g)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year filter */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Ültetési év</Label>
        <div className="mt-2">
          <Slider min={1900} max={2025} step={1} value={year} onValueChange={setYear} />
          <div className="text-xs text-gray-500 mt-1">{year[0]}+</div>
        </div>
      </div>

      {/* District filter */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Körzet</Label>
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Válassz" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="I">I. kerület</SelectItem>
            <SelectItem value="II">II. kerület</SelectItem>
            <SelectItem value="III">III. kerület</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply button */}
      <Button className="w-full mt-4" onClick={applyFilters}>
        Szűrés
      </Button>
    </div>
  )
}
