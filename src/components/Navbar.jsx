export default function Navbar({ onReportClick }) {
  return (
    <div style={{
      backgroundColor: '#1a1a2e',
      color: 'white',
      padding: '0 24px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🚦</span>
        <span style={{ fontSize: '18px', fontWeight: '600' }}>
          SmartTraffic
        </span>
      </div>
      <div style={{ display: 'flex', gap: '24px', fontSize: '14px', alignItems: 'center' }}>
        <span style={{ color: '#4ade80' }}>● Live</span>
        <span>Delhi, India</span>
        <span
          onClick={onReportClick}
          style={{
            backgroundColor: '#e63946',
            padding: '6px 14px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
          }}
        >
          🚨 Report Incident
        </span>
      </div>
    </div>
  )
}