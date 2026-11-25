import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, token } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  // Si ya inicio sesion, no tiene sentido volver a mostrar el formulario.
  if (token) return <Navigate to="/privado" replace />

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setError('')
    setCargando(true)
    try {
      await login(username, password)
      navigate('/privado')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="card">
      <h2>Iniciar sesion</h2>
      <p className="muted">Ingresa tus credenciales para obtener un token JWT.</p>

      <form onSubmit={manejarEnvio}>
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="labuser"
          required
        />

        <label htmlFor="password">Clave</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="LabPass123!"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Validando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  )
}
