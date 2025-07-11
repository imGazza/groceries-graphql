import './App.css'
import TopBar from './topbar/top-bar'
import ActiveSectionProvider from './provider/active-section/active-section-provider'
import HomeLayout from './pages/home/home-layout'

function App() {
  return (
    <ActiveSectionProvider>      
      <TopBar />
      <HomeLayout />
    </ActiveSectionProvider>
  )
}

export default App
