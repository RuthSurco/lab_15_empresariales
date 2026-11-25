import { useEffect, useState } from 'react'
import { getPrivado } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Privado() {
  const { token } = useAuth()
  const [mensaje, setMensaje] = useState('Cargando...')
  const [error, setError] = useState('')

  useEffect(() => {
    getPrivado()
      .then((datos) => setMensaje(`${datos.mensaje} (usuario: ${datos.usuario})`))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="card">
      <h2>Recurso privado</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p className="resultado">{mensaje}</p>
      )}

      <h3>Token JWT almacenado</h3>
      <code className="token">{token?.slice(0, 45)}...</code>
      <p className="muted">Se envia en el encabezado Authorization: Bearer &lt;token&gt;.</p>
    </section>
  )
}
