import { useEffect, useState } from 'react'
import { getPublico } from '../api.js'

export default function Publico() {
  const [mensaje, setMensaje] = useState('Cargando...')

  useEffect(() => {
    getPublico()
      .then((datos) => setMensaje(datos.mensaje))
      .catch((err) => setMensaje(err.message))
  }, [])

  return (
    <section className="card">
      <h2>Recurso publico</h2>
      <p className="resultado">{mensaje}</p>
      <p className="muted">Esta vista se puede consultar sin token JWT.</p>
    </section>
  )
}
