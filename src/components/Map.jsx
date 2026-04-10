import { MapContainer, TileLayer, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const roads = [
  {
    name: 'NH-48 — Heavy Traffic',
    color: '#e63946',
    positions: [[28.6139, 77.2090], [28.5921, 77.1884], [28.5700, 77.1600]],
  },
  {
    name: 'Connaught Place — Heavy',
    color: '#e63946',
    positions: [[28.6315, 77.2167], [28.6289, 77.2095], [28.6250, 77.2100]],
  },
  {
    name: 'Ring Road — Moderate',
    color: '#f4a261',
    positions: [[28.6562, 77.2410], [28.6450, 77.2300], [28.6300, 77.2200], [28.6139, 77.2090]],
  },
  {
    name: 'Lajpat Nagar — Moderate',
    color: '#f4a261',
    positions: [[28.5677, 77.2433], [28.5700, 77.2350], [28.5730, 77.2280]],
  },
  {
    name: 'Noida Expressway — Free',
    color: '#4ade80',
    positions: [[28.5355, 77.3910], [28.5500, 77.3500], [28.5600, 77.3200]],
  },
  {
    name: 'Dwarka Expressway — Free',
    color: '#4ade80',
    positions: [[28.5921, 77.0400], [28.6000, 77.0700], [28.6100, 77.0900]],
  },
  {
    name: 'India Gate — Free',
    color: '#4ade80',
    positions: [[28.6129, 77.2295], [28.6139, 77.2200], [28.6150, 77.2100]],
  },
  {
    name: 'Rohtak Road — Moderate',
    color: '#f4a261',
    positions: [[28.6600, 77.1000], [28.6700, 77.0700], [28.6800, 77.0400]],
  },
  {
    name: 'Mathura Road — Heavy',
    color: '#e63946',
    positions: [[28.5500, 77.2500], [28.5350, 77.2600], [28.5200, 77.2700]],
  },
  {
    name: 'Outer Ring Road — Free',
    color: '#4ade80',
    positions: [[28.6800, 77.1500], [28.6700, 77.2000], [28.6600, 77.2500]],
  },
]

export default function Map() {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="CartoDB"
      />

      {roads.map((road, i) => (
        <Polyline
          key={i}
          positions={road.positions}
          pathOptions={{
            color: road.color,
            weight: 5,
            opacity: 0.85,
          }}
        >
          <Tooltip sticky>{road.name}</Tooltip>
        </Polyline>
      ))}

    </MapContainer>
  )
}