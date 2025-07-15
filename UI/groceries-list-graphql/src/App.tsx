import './App.css'
import TopBar from './features/layout/top-bar'
import ActiveSectionProvider from './provider/active-section/active-section-provider'
import HomeLayout from './features/layout/home-layout'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './http/apollo-client'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ActiveSectionProvider>
        <TopBar />
        <HomeLayout />
      </ActiveSectionProvider>
    </ApolloProvider>
  )
}

export default App
