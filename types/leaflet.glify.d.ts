import * as L from 'leaflet'
import 'leaflet.glify'

declare module 'leaflet' {
  namespace glify {
    function points(options: {
      map: L.Map
      data: [number, number][]
      size?: number
      opacity?: number
      color?:
        | [number, number, number, number]
        | string
        | ((index: number, point: [number, number]) => string)
      sensitivity?: number
      click?: (e: MouseEvent, point: [number, number], xy: { index: number }) => void
    }): { remove: () => void }
  }
}
