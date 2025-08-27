'use client'

import { useState } from 'react'
import { getCityCoordinates } from '@/utils/geoCoding'

type FilterProps = {
  onFilterChange: (cityCenter: [number, number] | null, radius: number) => void
}

export function Filter({ onFilterChange }: FilterProps) {
  const [city, setCity] = useState('')
  const [radius, setRadius] = useState(5)

  const handleSearch = async () => {
    const coords = await getCityCoordinates(city)
    onFilterChange(coords, radius)
  }

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Város..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        min={1}
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        className="border p-1 w-20 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
        Keresés
      </button>
    </div>
  )
}
