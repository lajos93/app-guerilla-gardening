'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Filters } from '.'
import { SpeciesCategory } from './Desktop'

export function FiltersMobile({ onChange }: { onChange: (filters: Filters) => void }) {
  const [open, setOpen] = useState(false)
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
    setOpen(false)
  }

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
          <Input
            placeholder="Keresés fajra..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Categories */}
          <div>
            <Label className="text-xs text-gray-500 uppercase">Kategória</Label>
            <div className="flex gap-2 overflow-x-auto mt-2 pb-2">
              {speciesCategories.map((item) => (
                <Button
                  key={item.id}
                  size="sm"
                  variant={selectedCategory === item.name ? 'default' : 'outline'}
                  className="rounded-full flex-shrink-0"
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
            <div className="mt-2 space-y-2">
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
      )}
    </div>
  )
}
