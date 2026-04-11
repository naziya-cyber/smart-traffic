import { useState, useEffect } from 'react'

const initialAlerts = [
  { id: 1, type: 'Heavy Traffic', location: 'Connaught Place', time: '2 min ago', icon: '🔴' },
  { id: 2, type: 'Moderate Traffic', location: 'India Gate', time: '5 min ago', icon: '🟡' },
  { id: 3, type: 'Accident Reported', location: 'NH-48 Highway', time: '8 min ago', icon: '⚠️' },
  { id: 4, type: 'Road Blocked', location: 'Lajpat Nagar', time: '12 min ago', icon: '🚧' },
  { id: 5, type: 'Traffic Clearing', location: 'Dwarka Expressway', time: '15 min ago', icon: '🟢' },
  { id: 6, type: 'Free Flow', location: 'Noida Expressway', time: '18 min ago', icon: '🟢' },
]

function getPrediction() {
  const hour = new Date().getHours()
  const day = new Date().getDay()
  const isWeekend = day === 0 || day === 6

  if (isWeekend) return {
    current: 'Moderate', currentColor: '#f4a261', currentLevel: 50,
    future: 'Low', futureColor: '#4ade80', futureLevel: 25,
    advice: 'Weekend traffic — roads clearing soon', adviceIcon: '😊'
  }
  if (hour >= 8 && hour <= 10) return {
    current: 'Heavy', currentColor: '#e63946', currentLevel: 85,
    future: 'Very Heavy', futureColor: '#c1121f', futureLevel: 95,
    advice: 'Peak morning rush — avoid NH-48', adviceIcon: '⚠️'
  }
  if (hour >= 11 && hour <= 13) return {
    current: 'Moderate', currentColor: '#f4a261', currentLevel: 55,
    future: 'Low', futureColor: '#4ade80', futureLevel: 30,
    advice: 'Traffic easing — good time to travel', adviceIcon: '✅'
  }
  if (hour >= 14 && hour <= 16) return {
    current: 'Low', currentColor: '#4ade80', currentLevel: 30,
    future: 'Moderate', futureColor: '#f4a261', futureLevel: 60,
    advice: 'Evening rush approaching in 1 hour', adviceIcon: '⏰'
  }
  if (hour >= 17 && hour <= 20) return {
    current: 'Very Heavy', currentColor: '#c1121f', currentLevel: 92,
    future: 'Heavy', futureColor: '#e63946', futureLevel: 75,
    advice: 'Peak evening rush — use alternate routes', adviceIcon: '🚨'
  }
  return {
    current: 'Low', currentColor: '#4ade80', currentLevel: 20,
    future: 'Very Low', futureColor: '#4ade80', futureLevel: 10,
    advice: 'Roads are clear — safe to travel', adviceIcon: '🌙'
  }
}

function PredictionBar({ label, level, color }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', marginBottom: '4px' }}>
        <span>{label}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div style={{ height: '6px', backgroundColor: '#2a2a3e', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${level}%`, backgroundColor: color, borderRadius: '3px', transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

export default function AlertPanel({ newIncident }) {
  const [prediction, setPrediction] = useState(getPrediction())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveAlerts, setLiveAlerts] = useState(initialAlerts)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setPrediction(getPrediction())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (newIncident) {
      setLiveAlerts(prev => [newIncident, ...prev])
    }
  }, [newIncident])

  const timeString = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  })

  return (
    <div style={{
      width: '280px',
      backgroundColor: '#0f0f1a',
      color: 'white',
      overflowY: 'auto',
      borderRight: '1px solid #2a2a3e',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #2a2a3e', backgroundColor: '#16213e' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Live Traffic Alerts</div>
        <div style={{ fontSize: '12px', color: '#888' }}>Updated at {timeString}</div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #2a2a3e' }}>
        {[
          { label: 'Jams', value: '12', color: '#e63946' },
          { label: 'Incidents', value: '3', color: '#f4a261' },
          { label: 'Clear', value: '8', color: '#4ade80' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', borderRight: '1px solid #2a2a3e' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: '12px', padding: '14px', backgroundColor: '#16213e', borderRadius: '10px', border: '1px solid #2a2a3e' }}>
        <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.5px' }}>
          ⚡ AI TRAFFIC PREDICTION
        </div>
        <PredictionBar label={`Now — ${prediction.current}`} level={prediction.currentLevel} color={prediction.currentColor} />
        <PredictionBar label={`In 20 min — ${prediction.future}`} level={prediction.futureLevel} color={prediction.futureColor} />
        <div style={{ marginTop: '10px', padding: '8px 10px', backgroundColor: '#0f0f1a', borderRadius: '6px', fontSize: '11px', color: '#aaa', lineHeight: '1.5' }}>
          {prediction.adviceIcon} {prediction.advice}
        </div>
      </div>

      <div style={{ padding: '8px 12px', fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '0.5px' }}>
        RECENT ALERTS
      </div>

      <div style={{ flex: 1 }}>
        {liveAlerts.map((alert, index) => (
          <div
            key={index}
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid #1a1a2e',
              cursor: 'pointer',
              backgroundColor: index === 0 && alert.time === 'Just now' ? '#1a0a0e' : 'transparent',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16213e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = index === 0 && alert.time === 'Just now' ? '#1a0a0e' : 'transparent'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>
                {alert.icon} {alert.type}
              </span>
              <span style={{
                fontSize: '10px',
                color: alert.time === 'Just now' ? '#4ade80' : '#555',
                fontWeight: alert.time === 'Just now' ? '600' : '400',
              }}>
                {alert.time}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>📍 {alert.location}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2a3e', fontSize: '11px', color: '#555', textAlign: 'center' }}>
        Powered by TomTom Traffic API
      </div>
    </div>
  )
}