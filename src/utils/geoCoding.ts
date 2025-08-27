export async function getCityCoordinates(city: string): Promise<[number, number] | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    }
    return null
  } catch (err) {
    console.error('Geocoding error:', err)
    return null
  }
}
