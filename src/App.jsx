import Map from './components/Map'
import Navbar from './components/Navbar'
import AlertPanel from './components/AlertPanel'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AlertPanel />
        <div style={{ flex: 1 }}>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default App