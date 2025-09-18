import { Layer } from 'leaflet'
import { Feature } from 'geojson'

declare module 'leaflet.vectorgrid' {
  const VectorGrid: {
    protobuf: (
      url: string,
      options?: {
        vectorTileLayerStyles?: Record<string, any>
        interactive?: boolean
        maxZoom?: number
        getFeatureId?: (feature: Feature) => string | number
        [key: string]: any
      },
    ) => Layer
  }

  export = VectorGrid
}
