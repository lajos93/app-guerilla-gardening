'use client'

import { useEffect, useMemo, useRef } from 'react'
import * as L from 'leaflet'
import debounce from 'lodash/debounce'
import 'leaflet.glify'
import { Tree } from '../types'

type Props = {
  map: L.Map | null
  trees: Tree[]
}

export function GlifyLayer({ map, trees }: Props) {
  const layerRef = useRef<any>(null)

  const redrawLayer = useMemo(
    () =>
      debounce(() => {
        if (!map || trees.length === 0) return

        const data = trees
          .filter((t) => t.lat != null && t.lon != null)
          .map((t) => [Number(t.lat), Number(t.lon)] as [number, number])

        try {
          layerRef.current?.remove()
          layerRef.current = L.glify.points({
            map,
            data,
            size: 6,
            opacity: 0.85,
            color: [0, 128, 0, 0.7],
            click: (e, point) => {
              const lat = Number(point[0])
              const lon = Number(point[1])
              const tree = trees.find((t) => Number(t.lat) === lat && Number(t.lon) === lon)
              if (!tree) return

              L.popup()
                .setLatLng([lat, lon])
                .setContent(`<strong>Fa ID:</strong> ${tree.id}<br/>${tree.county ?? ''}`)
                .openOn(map)
            },
          })
        } catch (err) {
          console.warn('Glify redraw skipped', err)
        }
      }, 50), // debounce 50ms
    [map, trees],
  )

  useEffect(() => {
    redrawLayer()
    return () => {
      layerRef.current?.remove()
      redrawLayer.cancel()
    }
  }, [map, trees, redrawLayer])

  return null
}
