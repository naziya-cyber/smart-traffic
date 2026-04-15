import { useState } from 'react'
import Map from './components/Map'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AlertPanel from './components/AlertPanel'
import ReportModal from './components/ReportModal'
import RoutePanel from './components/RoutePanel'
import Dashboard from './pages/Dashboard'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [newIncident, setNewIncident] = useState(null)
  const [selectedRoad, setSelectedRoad] = useState(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [activeTab, setActiveTab] = useState('map')

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar
        onReportClick={() => setShowModal(true)}
        onDashboardClick={() => setShowDashboard(true)}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <AlertPanel newIncident={newIncident} />
        <div style={{ flex: 1, position: 'relative' }}>
          <Map onRoadClick={(road) => setSelectedRoad(road)} />
        </div>
      </div>
      <RoutePanel
        road={selectedRoad}
        onClose={() => setSelectedRoad(null)}
      />
      {showModal && (
        <ReportModal
          onClose={() => setShowModal(false)}
          onSubmit={(incident) => setNewIncident(incident)}
        />
      )}
    </div>
  )
}

export default App