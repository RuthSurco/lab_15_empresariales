import { createContext, useContext, useState } from 'react'
import { getAccessToken, login as apiLogin, logout as apiLogout } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Si ya hay token guardado, el usuario sigue autenticado tras recargar.
  const [token, setToken] = useState(() => getAccessToken())

  const login = async (username, password) => {
    const datos = await apiLogin(username, password)
    setToken(datos.access)
    return datos
  }

  const logout = () => {
    apiLogout()
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
