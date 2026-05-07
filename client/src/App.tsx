import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GuestRoute from './components/GuestRoute.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import Admin from './pages/admin/Admin.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

function App() {
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