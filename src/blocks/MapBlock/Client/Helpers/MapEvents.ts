import { useMapEvents } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'

export function MapEvents({
  onCenterChange,
}: {
  onCenterChange: (center: [number, number], zoom: number, bounds: LatLngBounds) => void
}) {
  useMapEvents({
    moveend: (e) => {
      const map = e.target
      onCenterChange([map.getCenter().lat, map.getCenter().lng], map.getZoom(), map.getBounds())
    },
    zoomend: (e) => {
      const map = e.target
      onCenterChange([map.getCenter().lat, map.getCenter().lng], map.getZoom(), map.getBounds())
    },
  })
  return null
}
