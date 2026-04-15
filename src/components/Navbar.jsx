export default function Navbar({ onReportClick, onDashboardClick }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '0 24px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e2e8f0',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🚦</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
            SmartTraffic
          </span>
          <span style={{
            fontSize: '10px',
            color: '#64748b',
            backgroundColor: '#f1f5f9',
            padding: '2px 8px',
            borderRadius: '4px',
            marginLeft: '4px',
          }}></span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748b' }}>
          {[''].map(item => (
            <span key={item} style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = '#0f172a'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >{item}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#f0fdf4',
          color: '#16a34a',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid #bbf7d0',
        }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'inline-block' }} />
          Live
        </div>
        <div
          onClick={onDashboardClick}
          style={{
            fontSize: '13px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#475569',
            fontWeight: '500',
          }}
        >
          Authority View
        </div>
        <div
          onClick={onReportClick}
          style={{
            fontSize: '13px',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          + Report Incident
        </div>
        {/* <div style={{
          width: '32px', height: '32px',
          backgroundColor: '#0f172a',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '12px', fontWeight: '600',
          cursor: 'pointer',
        }}>N</div> */}
      </div>
    </div>
  )
}