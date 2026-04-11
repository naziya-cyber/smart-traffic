import { useState } from 'react'
import Map from './components/Map'
import Navbar from './components/Navbar'
import AlertPanel from './components/AlertPanel'
import ReportModal from './components/ReportModal'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [newIncident, setNewIncident] = useState(null)

  function handleSubmit(incident) {
    setNewIncident(incident)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar onReportClick={() => setShowModal(true)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AlertPanel newIncident={newIncident} />
        <div style={{ flex: 1 }}>
          <Map />
        </div>
      </div>
      {showModal && (
        <ReportModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default App