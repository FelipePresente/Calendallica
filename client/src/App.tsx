import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useServerWakeUp from './hooks/useServerWakeUp.ts'
import GuestRoute from './components/GuestRoute.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import Admin from './pages/admin/Admin.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import ServerWakeUp from './components/ServerWakeUp.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

function App() {
  const api_url = import.meta.env.VITE_API_URL
  const isServerAwake = useServerWakeUp(api_url)

  if (!isServerAwake) return <ServerWakeUp />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestRoute>
          <Home />
        </GuestRoute>} />

        <Route path="/login" element={<GuestRoute>
          <Login />
        </GuestRoute>} />

        <Route path="/signup" element={<GuestRoute>
          <SignUp />
        </GuestRoute>} />

        <Route path="/admin" element={<ProtectedRoute adminOnly={true}>
          <Admin />
        </ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute adminOnly={false}>
          <Dashboard />
        </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App