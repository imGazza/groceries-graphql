import './App.css'
import TopBar from './features/layout/top-bar'
import ActiveSectionProvider from './provider/active-section/active-section-provider'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './http/apollo-client'
import Footer from './features/layout/footer'
import DraftListProvider from './provider/draft-list/draft-list-provider'
import AuthProvider from './provider/auth/auth-provider'
import { Outlet } from 'react-router'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ActiveSectionProvider>
          <DraftListProvider>
            <TopBar />
            <Outlet />
            <Footer />
          </DraftListProvider>
        </ActiveSectionProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
