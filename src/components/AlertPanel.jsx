import { useState, useEffect } from 'react'

const initialAlerts = [
  { id: 1, type: 'Heavy Traffic', location: 'Connaught Place Central Circle', time: 'Just now', icon: '🔴', delay: '5 min delay' },
  { id: 2, type: 'Moderate Traffic', location: 'India Gate Circular Road', time: '12 min ago', icon: '🟡', delay: '2 min delay' },
  { id: 3, type: 'Accident Reported', location: 'NH-48 Highway', time: '8 min ago', icon: '⚠️', delay: '8 min delay' },
  { id: 4, type: 'Road Blocked', location: 'Lajpat Nagar', time: '12 min ago', icon: '🚧', delay: '15 min delay' },
  { id: 5, type: 'Traffic Clearing', location: 'Dwarka Expressway', time: '15 min ago', icon: '🟢', delay: 'Clearing' },
]

function getPrediction() {
  const hour = new Date().getHours()
  const day = new Date().getDay()
  const isWeekend = day === 0 || day === 6
  if (isWeekend) return { current: 'Moderate', currentLevel: 50, future: 'Low', futureLevel: 25, advice: 'Weekend traffic — roads clearing soon' }
  if (hour >= 8 && hour <= 10) return { current: 'Heavy', currentLevel: 85, future: 'Very Heavy', futureLevel: 95, advice: 'Peak morning rush — avoid NH-48' }
  if (hour >= 17 && hour <= 20) return { current: 'Very Heavy', currentLevel: 92, future: 'Heavy', futureLevel: 75, advice: 'Peak evening rush — use alternate routes' }
  if (hour >= 11 && hour <= 16) return { current: 'Moderate', currentLevel: 55, future: 'Low', futureLevel: 30, advice: 'Traffic easing — good time to travel' }
  return { current: 'Low', currentLevel: 20, future: 'Very Low', futureLevel: 10, advice: 'Roads are clear — safe to travel' }
}

function getLevelColor(level) {
  if (level >= 70) return '#ef4444'
  if (level >= 40) return '#f59e0b'
  return '#10b981'
}

export default function AlertPanel({ newIncident }) {
  const [prediction] = useState(getPrediction())
  const [liveAlerts, setLiveAlerts] = useState(initialAlerts)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (newIncident) setLiveAlerts(prev => [newIncident, ...prev])
  }, [newIncident])

  return (
    <div style={{
      width: '280px',
      backgroundColor: 'white',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>

      {/* Focus card */}
      <div style={{ padding: '14px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.5px' }}>
          CURRENT FOCUS
        </div>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
          Connaught Place
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          backgroundColor: '#fef2f2', color: '#ef4444',
          fontSize: '11px', fontWeight: '600',
          padding: '2px 8px', borderRadius: '20px',
        }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }} />
          Heavy Congestion
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
        {[
          { label: 'JAMS', value: '12', color: '#ef4444', bg: '#fef2f2' },
          { label: 'INCIDENTS', value: '3', color: '#f59e0b', bg: '#fffbeb' },
          { label: 'CLEAR', value: '8', color: '#10b981', bg: '#f0fdf4' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, padding: '10px 6px', textAlign: 'center',
            borderRight: '1px solid #e2e8f0',
            backgroundColor: stat.bg,
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '600' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Prediction */}
      <div style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.5px' }}>
          PREDICTIVE ANALYSIS — NEXT 60 MINS
        </div>
        {[
          { label: `Now — ${prediction.current}`, level: prediction.currentLevel },
          { label: `In 20 min — ${prediction.future}`, level: prediction.futureLevel },
        ].map((bar, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>
              <span>{bar.label}</span>
              <span style={{ color: getLevelColor(bar.level), fontWeight: '600' }}>{bar.level}%</span>
            </div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${bar.level}%`,
                backgroundColor: getLevelColor(bar.level),
                borderRadius: '3px', transition: 'width 1s ease'
              }} />
            </div>
          </div>
        ))}
        <div style={{
          marginTop: '8px', padding: '8px',
          backgroundColor: '#f8fafc', borderRadius: '6px',
          fontSize: '11px', color: '#64748b', lineHeight: '1.5',
          border: '1px solid #e2e8f0',
        }}>
          📊 {prediction.advice}
        </div>
      </div>

      {/* Live Alerts */}
      <div style={{ padding: '10px 14px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.5px' }}>LIVE ALERTS</span>
        <span style={{ fontSize: '11px', color: '#10b981', cursor: 'pointer', fontWeight: '500' }}>View All</span>
      </div>

      <div style={{ flex: 1 }}>
        {liveAlerts.map((alert, index) => (
          <div
            key={index}
            style={{
              padding: '10px 14px',
              borderBottom: '1px solid #f1f5f9',
              cursor: 'pointer',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              width: '28px', height: '28px',
              backgroundColor: alert.icon === '🟢' ? '#f0fdf4' : alert.icon === '🟡' ? '#fffbeb' : '#fef2f2',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', flexShrink: 0,
            }}>
              {alert.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>
                {alert.type}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                {alert.location}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: '500' }}>{alert.delay}</span>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}