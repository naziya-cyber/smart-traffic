import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const peakData = [
  { hour: '6am', level: 35 }, { hour: '7am', level: 55 },
  { hour: '8am', level: 90 }, { hour: '9am', level: 95 },
  { hour: '10am', level: 70 }, { hour: '11am', level: 50 },
  { hour: '12pm', level: 45 }, { hour: '1pm', level: 40 },
  { hour: '2pm', level: 38 }, { hour: '3pm', level: 42 },
  { hour: '4pm', level: 60 }, { hour: '5pm', level: 88 },
  { hour: '6pm', level: 95 }, { hour: '7pm', level: 85 },
  { hour: '8pm', level: 65 }, { hour: '9pm', level: 40 },
]

const roads = [
  { name: 'NH-48 Highway', status: 'Heavy', level: 88, signal: 'Increase green by 45s', incidents: 2, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Connaught Place', status: 'Heavy', level: 82, signal: 'Increase green by 40s', incidents: 1, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Mathura Road', status: 'Heavy', level: 79, signal: 'Increase green by 35s', incidents: 3, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Chandni Chowk', status: 'Heavy', level: 75, signal: 'Increase green by 30s', incidents: 1, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Ring Road', status: 'Moderate', level: 55, signal: 'Increase green by 15s', incidents: 0, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Rohtak Road', status: 'Moderate', level: 50, signal: 'Increase green by 10s', incidents: 0, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Lajpat Nagar', status: 'Moderate', level: 48, signal: 'Keep current timing', incidents: 1, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Outer Ring Road', status: 'Free', level: 22, signal: 'Reduce green by 10s', incidents: 0, color: '#10b981', bg: '#f0fdf4' },
  { name: 'Dwarka Expressway', status: 'Free', level: 18, signal: 'Reduce green by 15s', incidents: 0, color: '#10b981', bg: '#f0fdf4' },
  { name: 'Noida Expressway', status: 'Free', level: 15, signal: 'Reduce green by 20s', incidents: 0, color: '#10b981', bg: '#f0fdf4' },
  { name: 'India Gate Road', status: 'Free', level: 12, signal: 'Reduce green by 20s', incidents: 0, color: '#10b981', bg: '#f0fdf4' },
]

const aiRecommendations = [
  {
    title: 'Congestion Mitigation',
    desc: 'Redirecting transit vehicles via Outer Ring Road to reduce central core density by 16%.',
    impact: '94%',
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  {
    title: 'Signal Synchronization',
    desc: 'Adjusting cycle times for 12 intersections along NH-48 Road to create a green wave corridor.',
    impact: '89%',
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  {
    title: 'Resource Deployment',
    desc: 'Proactive placement of tow units and emergency responders at High-Risk Zones B3 and C1.',
    impact: '81%',
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
  },
]

const getBarColor = (level) => {
  if (level >= 75) return '#ef4444'
  if (level >= 50) return '#f59e0b'
  return '#10b981'
}

function StatCard({ label, value, sub, color, bg, icon }) {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px 20px',
      flex: 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>{label}</div>
        <span style={{ fontSize: '18px' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color }}>{value}</div>
      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{sub}</div>
    </div>
  )
}

export default function Dashboard({ onBack }) {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? roads : roads.filter(r => r.status === filter)

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* Navbar */}
      <div style={{
        backgroundColor: 'white',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🚦</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>SmartTraffic</span>
            <span style={{ fontSize: '10px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>AI</span>
          </div>
          {['Solutions', 'Pricing', 'Case Studies', 'Network Status'].map(item => (
            <span key={item} style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#f0fdf4', color: '#16a34a',
            padding: '4px 10px', borderRadius: '20px', border: '1px solid #bbf7d0',
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'inline-block' }} />
            Live
          </div>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Delhi Traffic Control</span>
          <div
            onClick={onBack}
            style={{
              fontSize: '13px', backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0', padding: '6px 14px',
              borderRadius: '6px', cursor: 'pointer', color: '#475569', fontWeight: '500',
            }}
          >
            ← Driver View
          </div>
          <div style={{
            width: '32px', height: '32px', backgroundColor: '#0f172a',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '600',
          }}>N</div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* AI Prediction Banner */}
        <div style={{
          backgroundColor: '#eef2ff',
          border: '1px solid #c7d2fe',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#3730a3', marginBottom: '6px' }}>
              ⚡ AI Predictive Intelligence
            </div>
            <div style={{ fontSize: '13px', color: '#4338ca', lineHeight: '1.6' }}>
              Based on historical trends and satellite telemetry, we predict a{' '}
              <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '1px 6px', borderRadius: '4px', fontSize: '12px' }}>
                15% surge
              </span>{' '}
              in heavy vehicle traffic on NH-48 within the next 45 minutes. SmartTraffic recommends
              immediate adjustment of signals A4 and A5 to favor Northbound lanes.
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{
                backgroundColor: '#4f46e5', color: 'white',
                padding: '7px 16px', borderRadius: '6px',
                fontSize: '12px', fontWeight: '600', cursor: 'pointer',
              }}>
                ⚡ Execute Recommendation
              </div>
              <div style={{
                backgroundColor: 'white', color: '#4f46e5',
                padding: '7px 16px', borderRadius: '6px',
                fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                border: '1px solid #c7d2fe',
              }}>
                Dismiss
              </div>
            </div>
          </div>
          <div style={{
            textAlign: 'center', marginLeft: '24px',
            backgroundColor: 'white', borderRadius: '12px',
            padding: '16px 24px', border: '1px solid #c7d2fe',
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>CONFIDENCE LEVEL</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#4f46e5' }}>96.8%</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '500' }}>● High Accuracy</div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Strategic AI Recommendations</div>
            <div style={{
              fontSize: '11px', backgroundColor: '#fef2f2', color: '#ef4444',
              padding: '3px 10px', borderRadius: '20px', border: '1px solid #fecaca', fontWeight: '600',
            }}>
              3 Suggestions Pending
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {aiRecommendations.map((rec, i) => (
              <div key={i} style={{
                flex: 1, backgroundColor: rec.bg,
                border: `1px solid ${rec.border}`,
                borderRadius: '12px', padding: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: rec.color }}>{rec.title}</div>
                  <div style={{ fontSize: '11px', color: rec.color, fontWeight: '600' }}>{rec.impact} IMPACT</div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginBottom: '12px' }}>
                  {rec.desc}
                </div>
                <div style={{
                  backgroundColor: rec.color, color: 'white',
                  padding: '7px 14px', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  textAlign: 'center',
                }}>
                  Execute →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <StatCard label="Roads Monitored" value="11" sub="↑ 2 added this month" color="#0f172a" icon="🗺️" />
          <StatCard label="Heavy Congestion" value="4" sub="Requires intervention" color="#ef4444" icon="🚨" />
          <StatCard label="Active Incidents" value="8" sub="↓ Avg response 12m" color="#f59e0b" icon="⚠️" />
          <StatCard label="Free Flow Roads" value="4" sub="Optimal conditions" color="#10b981" icon="✅" />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>

          {/* Road Table */}
          <div style={{ flex: 1 }}>
            <div style={{
              backgroundColor: 'white', border: '1px solid #e2e8f0',
              borderRadius: '12px', overflow: 'hidden',
            }}>
              <div style={{
                padding: '14px 16px', borderBottom: '1px solid #e2e8f0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Road Status Overview</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Real-time telemetry and predictive routing</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['All', 'Heavy', 'Moderate', 'Free'].map(f => (
                    <div
                      key={f}
                      onClick={() => setFilter(f)}
                      style={{
                        fontSize: '11px', padding: '4px 10px', borderRadius: '6px',
                        cursor: 'pointer', fontWeight: '500',
                        backgroundColor: filter === f ? '#0f172a' : '#f1f5f9',
                        color: filter === f ? 'white' : '#64748b',
                      }}
                    >{f}</div>
                  ))}
                </div>
              </div>

              {/* Column headers */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 2fr 0.5fr',
                padding: '8px 16px', fontSize: '11px', color: '#94a3b8',
                borderBottom: '1px solid #f1f5f9', fontWeight: '600',
              }}>
                <span>ROAD NAME</span><span>STATUS</span>
                <span>CONGESTION</span><span>SIGNAL ADVICE</span><span></span>
              </div>

              {filtered.map((road, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 2fr 0.5fr',
                    padding: '12px 16px', borderBottom: '1px solid #f8fafc',
                    alignItems: 'center', fontSize: '13px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>{road.name}</span>
                  <span style={{
                    display: 'inline-block', fontSize: '11px', fontWeight: '600',
                    color: road.color, backgroundColor: road.bg,
                    padding: '2px 8px', borderRadius: '20px',
                  }}>{road.status}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      flex: 1, height: '5px', backgroundColor: '#f1f5f9',
                      borderRadius: '3px', overflow: 'hidden', maxWidth: '80px',
                    }}>
                      <div style={{
                        height: '100%', width: `${road.level}%`,
                        backgroundColor: road.color, borderRadius: '3px',
                      }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{road.level}%</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{road.signal}</span>
                  <span style={{ fontSize: '12px', color: road.incidents > 0 ? '#ef4444' : '#94a3b8' }}>
                    {road.incidents > 0 ? `${road.incidents} ⚠️` : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Peak Hours Chart */}
            <div style={{
              backgroundColor: 'white', border: '1px solid #e2e8f0',
              borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
                Peak Hours Analysis
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                Hourly Traffic Volume (k)
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={peakData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white', border: '1px solid #e2e8f0',
                      borderRadius: '8px', fontSize: '12px',
                    }}
                    cursor={{ fill: '#f1f5f9' }}
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
              backgroundColor: 'white', border: '1px solid #e2e8f0',
              borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                🚑 Emergency Corridor
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                Override active signals
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '6px' }}>
                SELECT EMERGENCY ZONE
              </div>
              <select style={{
                width: '100%', padding: '8px 12px', marginBottom: '12px',
                backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: '6px', color: '#0f172a', fontSize: '12px', outline: 'none',
              }}>
                <option>District A-12 Hospital Route</option>
                <option>AIIMS → Safdarjung</option>
                <option>GTB Hospital → Ring Road</option>
                <option>RML Hospital → NH-48</option>
              </select>
              {[
                { route: 'AIIMS → Safdarjung', time: '8 min', status: 'Clear', color: '#10b981', bg: '#f0fdf4' },
                { route: 'GTB Hospital → Ring Road', time: '12 min', status: 'Moderate', color: '#f59e0b', bg: '#fffbeb' },
                { route: 'RML Hospital → NH-48', time: '18 min', status: 'Congested', color: '#ef4444', bg: '#fef2f2' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 10px', backgroundColor: '#f8fafc',
                  borderRadius: '6px', marginBottom: '6px', fontSize: '12px',
                }}>
                  <span style={{ color: '#475569' }}>{c.route}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#94a3b8' }}>{c.time}</span>
                    <span style={{
                      fontSize: '10px', padding: '2px 8px', borderRadius: '10px',
                      backgroundColor: c.bg, color: c.color, fontWeight: '600',
                    }}>{c.status}</span>
                  </div>
                </div>
              ))}
              <div style={{
                backgroundColor: '#ef4444', color: 'white',
                padding: '10px', borderRadius: '8px', textAlign: 'center',
                cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginTop: '4px',
              }}>
                🚨 Activate Priority Flow
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}