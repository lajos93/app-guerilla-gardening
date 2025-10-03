'use client'

import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Filters, useFiltersLogic } from './useFiltersLogic'

export function FiltersDesktop({ onChange }: { onChange: (filters: Filters) => void }) {
  const {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    selectedCategory,
    animatingCategory,
    categoryGroups,
    year,
    setYear,
    isGroupsLoading,
    groupsError,
    isCategoriesLoading,
    categoriesError,
    isSpeciesLoading,
    speciesError,
    speciesSearchResults,
    speciesCategories,
    allGroups,
    selectSpecies,
    selectCategory,
    toggleGroup,
  } = useFiltersLogic(onChange)

  if (isCategoriesLoading) return <div className="p-4">Betöltés...</div>
  if (categoriesError)
    return <div className="p-4 text-red-500">Nem sikerült betölteni a kategóriákat</div>

  return (
    <div className="w-72 p-4 rounded-2xl shadow bg-white max-h-[90vh] overflow-y-auto text-sm space-y-6">
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
                onClick={() => selectSpecies(sp)}
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
              const animating = animatingCategory === item.name
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    selectCategory(item)
                    setSearch('')
                    setIsOpen(false)
                  }}
                  className={`
                    relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-sm transition
                    ${active ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-gray-400'}
                    ${animating ? 'animated-border' : ''}
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
          {isGroupsLoading && <div className="text-sm text-gray-500">Betöltés...</div>}
          {groupsError && <div className="text-sm text-red-500">Nem sikerült betölteni</div>}

          {allGroups.map((g) => (
            <label key={g.id} className="flex items-center gap-2">
              <Checkbox
                checked={categoryGroups.includes(g.name)}
                onCheckedChange={() => toggleGroup(g.name)}
              />
              <span>{g.name}</span>
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
  )
}
