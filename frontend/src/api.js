const API_URL = 'http://127.0.0.1:8000'

/**
 * Inicia sesion: obtiene el access token y el refresh token.
 * Los guarda en localStorage para que persistan al recargar la pagina.
 */
export async function login(username, password) {
  const respuesta = await fetch(`${API_URL}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!respuesta.ok) {
    throw new Error('Credenciales invalidas. Verifica usuario y clave.')
  }

  const datos = await respuesta.json()
  localStorage.setItem('access', datos.access)
  localStorage.setItem('refresh', datos.refresh)
  return datos
}

/** Cierra sesion: elimina ambos tokens del navegador. */
export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}

export function getAccessToken() {
  return localStorage.getItem('access')
}

/** Endpoint publico: no necesita token. */
export async function getPublico() {
  const respuesta = await fetch(`${API_URL}/api/publico`)
  if (!respuesta.ok) throw new Error('No se pudo cargar el recurso publico')
  return respuesta.json()
}

/** Endpoint privado: envia el token en el encabezado Authorization: Bearer. */
export async function getPrivado() {
  const token = getAccessToken()
  const respuesta = await fetch(`${API_URL}/api/privado`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!respuesta.ok) {
    throw new Error('No autorizado: inicia sesion nuevamente')
  }
  return respuesta.json()
}
