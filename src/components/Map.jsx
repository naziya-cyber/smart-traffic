import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

const API_KEY = import.meta.env.VITE_TOMTOM_API_KEY

function TrafficLayer() {
  const map = useMap()
  useEffect(() => {
    map.setView([28.6139, 77.2090], 12)
  }, [map])
  return (
    <TileLayer
      url={`https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=${API_KEY}`}
      opacity={0.7}
    />
  )
}

export default function Map() {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="OpenStreetMap"
      />
      <TrafficLayer />
    </MapContainer>
  )
}