import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const peakData = [
  { hour: '6am', level: 35 },
  { hour: '7am', level: 55 },
  { hour: '8am', level: 90 },
  { hour: '9am', level: 95 },
  { hour: '10am', level: 70 },
  { hour: '11am', level: 50 },
  { hour: '12pm', level: 45 },
  { hour: '1pm', level: 40 },
  { hour: '2pm', level: 38 },
  { hour: '3pm', level: 42 },
  { hour: '4pm', level: 60 },
  { hour: '5pm', level: 88 },
  { hour: '6pm', level: 95 },
  { hour: '7pm', level: 85 },
  { hour: '8pm', level: 65 },
  { hour: '9pm', level: 40 },
]

const roads = [
  { name: 'NH-48 Highway', status: 'Heavy', level: 88, signal: 'Increase green by 45s', incidents: 2, color: '#e63946' },
  { name: 'Connaught Place', status: 'Heavy', level: 82, signal: 'Increase green by 40s', incidents: 1, color: '#e63946' },
  { name: 'Mathura Road', status: 'Heavy', level: 79, signal: 'Increase green by 35s', incidents: 3, color: '#e63946' },
  { name: 'Chandni Chowk', status: 'Heavy', level: 75, signal: 'Increase green by 30s', incidents: 1, color: '#e63946' },
  { name: 'Ring Road', status: 'Moderate', level: 55, signal: 'Increase green by 15s', incidents: 0, color: '#f4a261' },
  { name: 'Rohtak Road', status: 'Moderate', level: 50, signal: 'Increase green by 10s', incidents: 0, color: '#f4a261' },
  { name: 'Lajpat Nagar', status: 'Moderate', level: 48, signal: 'Keep current timing', incidents: 1, color: '#f4a261' },
  { name: 'Outer Ring Road', status: 'Free', level: 22, signal: 'Reduce green by 10s', incidents: 0, color: '#4ade80' },
  { name: 'Dwarka Expressway', status: 'Free', level: 18, signal: 'Reduce green by 15s', incidents: 0, color: '#4ade80' },
  { name: 'Noida Expressway', status: 'Free', level: 15, signal: 'Reduce green by 20s', incidents: 0, color: '#4ade80' },
  { name: 'India Gate Road', status: 'Free', level: 12, signal: 'Reduce green by 20s', incidents: 0, color: '#4ade80' },
]

const getBarColor = (level) => {
  if (level >= 75) return '#e63946'
  if (level >= 50) return '#f4a261'
  return '#4ade80'
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      backgroundColor: '#16213e',
      border: '1px solid #2a2a3e',
      borderRadius: '12px',
      padding: '16px 20px',
      flex: 1,
    }}>
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>{sub}</div>
    </div>
  )
}

export default function Dashboard({ onBack }) {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? roads
    : roads.filter(r => r.status === filter)

  const currentHour = new Date().getHours()
  const currentLabel = peakData[Math.min(currentHour - 6, peakData.length - 1)]?.hour || '6am'

  return (
    <div style={{
      backgroundColor: '#0a0a14',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'sans-serif',
    }}>

      {/* Navbar */}
      <div style={{
        backgroundColor: '#1a1a2e',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #2a2a3e',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🚦</span>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>SmartTraffic</span>
          <span style={{
            fontSize: '11px',
            backgroundColor: '#2a2a3e',
            color: '#888',
            padding: '2px 10px',
            borderRadius: '10px',
            marginLeft: '8px',
          }}>
            Authority Dashboard
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#4ade80' }}>● Live</span>
          <span style={{ fontSize: '13px', color: '#888' }}>Delhi Traffic Control</span>
          <div
            onClick={onBack}
            style={{
              fontSize: '13px',
              backgroundColor: '#16213e',
              border: '1px solid #2a2a3e',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              color: '#aaa',
            }}
          >
            ← Driver View
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <StatCard label="Total Roads Monitored" value="11" sub="Across Delhi NCR" color="white" />
          <StatCard label="Heavy Congestion" value="4" sub="Immediate action needed" color="#e63946" />
          <StatCard label="Active Incidents" value="8" sub="User reported" color="#f4a261" />
          <StatCard label="Free Flow Roads" value="4" sub="No intervention needed" color="#4ade80" />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>

          {/* Left — Road Table */}
          <div style={{ flex: 1 }}>
            <div style={{
              backgroundColor: '#16213e',
              border: '1px solid #2a2a3e',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>

              {/* Table header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid #2a2a3e',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>
                  Road Status Overview
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['All', 'Heavy', 'Moderate', 'Free'].map(f => (
                    <div
                      key={f}
                      onClick={() => setFilter(f)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: filter === f ? '#e63946' : '#2a2a3e',
                        color: filter === f ? 'white' : '#888',
                      }}
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1.5fr 2fr 0.5fr',
                padding: '8px 16px',
                fontSize: '11px',
                color: '#555',
                borderBottom: '1px solid #1a1a2e',
              }}>
                <span>Road</span>
                <span>Status</span>
                <span>Congestion</span>
                <span>Signal Advice</span>
                <span>🚨</span>
              </div>

              {/* Rows */}
              {filtered.map((road, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1.5fr 2fr 0.5fr',
                    padding: '12px 16px',
                    borderBottom: '1px solid #1a1a2e',
                    alignItems: 'center',
                    fontSize: '13px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a2a4e'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontWeight: '500' }}>{road.name}</span>
                  <span style={{
                    color: road.color,
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    {road.status}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      flex: 1,
                      height: '6px',
                      backgroundColor: '#2a2a3e',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      maxWidth: '80px',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${road.level}%`,
                        backgroundColor: road.color,
                        borderRadius: '3px',
                      }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#888' }}>{road.level}%</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#888' }}>{road.signal}</span>
                  <span style={{ fontSize: '12px', color: road.incidents > 0 ? '#e63946' : '#555' }}>
                    {road.incidents > 0 ? `${road.incidents} ⚠️` : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chart */}
          <div style={{ width: '340px' }}>
            <div style={{
              backgroundColor: '#16213e',
              border: '1px solid #2a2a3e',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Peak Hours Analysis
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
                Today's congestion pattern
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={peakData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#555' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#555' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '12px' }}
                    cursor={{ fill: '#ffffff11' }}
                  />
                  <Bar dataKey="level" radius={[3, 3, 0, 0]}>
                    {peakData.map((entry, index) => (
                      <Cell key={index} fill={getBarColor(entry.level)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Emergency Corridor */}
            <div style={{
              backgroundColor: '#16213e',
              border: '1px solid #2a2a3e',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                🚑 Emergency Corridor
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
                Activate priority route for emergency vehicles
              </div>
              {[
                { route: 'AIIMS → Safdarjung', time: '8 min', status: 'Clear' },
                { route: 'GTB Hospital → Ring Road', time: '12 min', status: 'Moderate' },
                { route: 'RML Hospital → NH-48', time: '18 min', status: 'Congested' },
              ].map((corridor, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  backgroundColor: '#0f0f1a',
                  borderRadius: '8px',
                  marginBottom: '6px',
                  fontSize: '12px',
                }}>
                  <span style={{ color: '#aaa' }}>{corridor.route}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#888' }}>{corridor.time}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: corridor.status === 'Clear' ? '#4ade8022' : corridor.status === 'Moderate' ? '#f4a26122' : '#e6394622',
                      color: corridor.status === 'Clear' ? '#4ade80' : corridor.status === 'Moderate' ? '#f4a261' : '#e63946',
                    }}>
                      {corridor.status}
                    </span>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: '10px',
                backgroundColor: '#e63946',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                🚨 Activate Emergency Corridor
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}