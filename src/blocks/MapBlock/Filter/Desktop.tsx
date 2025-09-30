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
  group: { id: number; name: string }
}

type Species = {
  id: number
  name: string
  latinName: string
}

export function FiltersDesktop({ onChange }: { onChange: (filters: Filters) => void }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryGroups, setCategoryGroups] = useState<string[]>([])
  const [year, setYear] = useState([2000])
  const [district, setDistrict] = useState('')

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
      <Input
        placeholder="Keresés fajra..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories */}
      <div>
        <Label className="text-xs text-gray-500 uppercase">Kategória</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {speciesCategories.map((item) => (
            <Button
              key={item.id}
              variant={selectedCategory === item.name ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCategory(item.name)}
            >
              {item.name}
            </Button>
          ))}
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
