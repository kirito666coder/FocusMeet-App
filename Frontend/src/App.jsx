import './App.css'
import { AuthProvider } from './context/Authprovider'

import AppRoutes from './routes/AppRoutes'
function App() {
  return (
    <>

     <AuthProvider>
     <AppRoutes/>
     </AuthProvider>
      


    </>
  )
}

export default App
