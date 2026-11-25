import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * Envuelve una vista privada. Si no existe token en localStorage,
 * redirige al login sin importar la URL que el usuario intentó abrir.
 */
export default function ProtectedRoute({ children }) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
