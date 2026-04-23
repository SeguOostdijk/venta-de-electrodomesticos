import { createContext, use, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { tokenStore } from '../../shared/lib/tokenStore'
import type { TokenPayload, Role } from '../../shared/types/api'
import type { User, AuthResponse } from './types'

interface AuthContextValue {
  user: User | null
  role: Role | null
  isAuthenticated: boolean
  isLoading: boolean
  setTokens: (tokens: AuthResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh()
    if (!refreshToken) {
      setIsLoading(false)
      return
    }
    // Intentar recuperar sesión via refresh al cargar la app
    import('../../shared/lib/axios').then(({ api }) => {
      api.post('/api/auth/refresh', { refreshToken })
        .then(({ data }) => {
          const tokens = data.data
          tokenStore.setAccess(tokens.accessToken)
          if (tokens.refreshToken) tokenStore.setRefresh(tokens.refreshToken)
          const payload = jwtDecode<TokenPayload>(tokens.accessToken)
          setUser({ id: payload.userId, name: '', email: payload.sub, role: payload.role })
        })
        .catch(() => {
          tokenStore.clear()
        })
        .finally(() => setIsLoading(false))
    })
  }, [])

  function setTokens(tokens: AuthResponse) {
    tokenStore.setAccess(tokens.accessToken)
    tokenStore.setRefresh(tokens.refreshToken)
    const payload = jwtDecode<TokenPayload>(tokens.accessToken)
    setUser({ id: payload.userId, name: '', email: payload.sub, role: payload.role })
  }

  function logout() {
    tokenStore.clear()
    setUser(null)
  }

  return (
    <AuthContext value={{
      user,
      role: user?.role ?? null,
      isAuthenticated: !!user,
      isLoading,
      setTokens,
      logout,
    }}>
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  const ctx = use(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
