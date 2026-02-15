import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import Admin from './pages/admin/Admin.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App