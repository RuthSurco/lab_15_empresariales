import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Login from './components/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Publico from './pages/Publico.jsx'
import Privado from './pages/Privado.jsx'

function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()                 // elimina el token de localStorage
    navigate('/login')       // vuelve al login
  }

  return (
    <nav className="navbar">
      <span className="brand">Lab15 · JWT</span>
      <div className="links">
        <Link to="/publico">Publico</Link>
        <Link to="/privado">Privado</Link>
        {token ? (
          <button type="button" onClick={cerrarSesion}>Cerrar sesion</button>
        ) : (
          <Link to="/login">Iniciar sesion</Link>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/publico" replace />} />
          <Route path="/publico" element={<Publico />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/privado"
            element={
              <ProtectedRoute>
                <Privado />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
