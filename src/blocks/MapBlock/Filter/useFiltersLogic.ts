'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

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

export function useFiltersLogic(onChange: (filters: Filters) => void) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatingCategory, setAnimatingCategory] = useState<string | null>(null)
  const [categoryGroups, setCategoryGroups] = useState<string[]>([])
  const [year, setYear] = useState([2000])
  const [district, setDistrict] = useState('')

  // category groups fetch
  const {
    data: categoryGroupsData,
    isLoading: isGroupsLoading,
    error: groupsError,
  } = useQuery<{ docs: { id: number; name: string }[] }>({
    queryKey: ['category-groups'],
    queryFn: async () => {
      const res = await fetch(`/api/category-groups?limit=50&sort=name`)
      if (!res.ok) throw new Error('Hiba a csoportok lekérésénél')
      return res.json()
    },
  })

  // species categories fetch
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery<{ docs: SpeciesCategory[] }>({
    queryKey: ['species-categories'],
    queryFn: async () => {
      const res = await fetch(`/api/species-categories?limit=50&sort=name`)
      if (!res.ok) throw new Error('Hiba a kategóriák lekérésénél')
      return res.json()
    },
  })

  // species autocomplete
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
      const res = await fetch(`/api/species/search?search=${search}`)
      if (!res.ok) throw new Error('Hiba a keresésnél')
      return res.json()
    },
    enabled: !!search,
  })

  const speciesSearchResults = speciesData?.docs ?? []
  const speciesCategories = categoriesData?.docs ?? []
  const allGroups = categoryGroupsData?.docs ?? []

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

  // animációs logika
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

  // faj kiválasztás handler
  const selectSpecies = (sp: Species) => {
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
  }

  // kategória kiválasztás handler
  const selectCategory = (item: SpeciesCategory) => {
    setSelectedCategory(item.name)
    if (item.group?.name) {
      setCategoryGroups([item.group.name])
    } else {
      setCategoryGroups([])
    }
  }

  // group toggle → mindig csak egy maradjon
  const toggleGroup = (groupName: string) => {
    setCategoryGroups((prev) => (prev.includes(groupName) ? [] : [groupName]))
  }

  return {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    selectedCategory,
    animatingCategory,
    categoryGroups,
    year,
    setYear,
    district,
    setDistrict,
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
    applyFilters,
  }
}
