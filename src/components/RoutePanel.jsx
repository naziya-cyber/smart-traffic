const routeSuggestions = {
  'NH-48 — Heavy Traffic': {
    avoid: 'NH-48 Highway',
    reason: 'Severe congestion — 45 min delay',
    routes: [
      { name: 'Dwarka Expressway', time: '28 min', status: 'Fast', color: '#4ade80' },
      { name: 'Palam Road', time: '35 min', status: 'Moderate', color: '#f4a261' },
    ]
  },
  'Connaught Place — Heavy Traffic': {
    avoid: 'Connaught Place inner circle',
    reason: 'Heavy traffic — 30 min delay',
    routes: [
      { name: 'Barakhamba Road', time: '12 min', status: 'Fast', color: '#4ade80' },
      { name: 'Kasturba Gandhi Marg', time: '18 min', status: 'Moderate', color: '#f4a261' },
    ]
  },
  'Mathura Road — Heavy Traffic': {
    avoid: 'Mathura Road',
    reason: 'Accident reported — 40 min delay',
    routes: [
      { name: 'Noida Expressway', time: '22 min', status: 'Fast', color: '#4ade80' },
      { name: 'Kalindi Kunj Road', time: '30 min', status: 'Moderate', color: '#f4a261' },
    ]
  },
  'Chandni Chowk — Heavy Traffic': {
    avoid: 'Chandni Chowk Main Road',
    reason: 'Road blocked — 50 min delay',
    routes: [
      { name: 'Ring Road via Shyama Prasad', time: '20 min', status: 'Fast', color: '#4ade80' },
      { name: 'Lothian Road', time: '25 min', status: 'Moderate', color: '#f4a261' },
    ]
  },
  'Ring Road — Moderate Traffic': {
    avoid: 'Ring Road south section',
    reason: 'Moderate congestion — 15 min delay',
    routes: [
      { name: 'Outer Ring Road', time: '18 min', status: 'Fast', color: '#4ade80' },
      { name: 'NH-48 alternate', time: '22 min', status: 'Moderate', color: '#f4a261' },
    ]
  },
  'default': {
    avoid: 'This road',
    reason: 'Traffic detected on this route',
    routes: [
      { name: 'Outer Ring Road', time: '20 min', status: 'Fast', color: '#4ade80' },
      { name: 'Alternate Route B', time: '28 min', status: 'Moderate', color: '#f4a261' },
    ]
  }
}

export default function RoutePanel({ road, onClose }) {
  if (!road) return null

  const data = routeSuggestions[road] || routeSuggestions['default']

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '280px',
      right: 0,
      backgroundColor: '#0f0f1a',
      borderTop: '2px solid #e63946',
      padding: '20px 24px',
      zIndex: 5000,
      display: 'flex',
      gap: '24px',
      alignItems: 'flex-start',
      animation: 'slideUp 0.3s ease',
    }}>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Left — Avoid section */}
      <div style={{ minWidth: '200px' }}>
        <div style={{ fontSize: '11px', color: '#e63946', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.5px' }}>
          ⚠️ AVOID
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>
          {data.avoid}
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          {data.reason}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', backgroundColor: '#2a2a3e', alignSelf: 'stretch' }} />

      {/* Middle — Route options */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.5px' }}>
          🗺️ SUGGESTED ROUTES
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {data.routes.map((route, i) => (
            <div key={i} style={{
              flex: 1,
              backgroundColor: '#16213e',
              border: `1px solid ${route.color}33`,
              borderRadius: '10px',
              padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>
                  {i === 0 ? '🥇' : '🥈'} Route {i + 1}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: route.color,
                  backgroundColor: `${route.color}22`,
                  padding: '2px 8px',
                  borderRadius: '10px',
                }}>
                  {route.status}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>
                {route.name}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: route.color }}>
                {route.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Close */}
      <div
        onClick={onClose}
        style={{
          cursor: 'pointer',
          color: '#555',
          fontSize: '20px',
          padding: '4px',
          marginTop: '-4px',
        }}
      >
        ✕
      </div>

    </div>
  )
}