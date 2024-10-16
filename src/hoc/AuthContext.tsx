import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import { IAuthProvider, IContext, IUser } from './AuthTypes'
import { M_LOGIN } from '../graphql/Mutations'
import { getCookie } from '../utils/cookies'

export const AuthContext = createContext<IContext>({} as IContext)
export const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [LoginUser] = useMutation(M_LOGIN)
  const [loggedInfo, setLoggedInfo] = useState<IUser | null>()

  useEffect(() => {
    const userLogged = JSON.parse(getCookie('_bu_l') as string)
    if (userLogged) {
      setLoggedInfo(userLogged)
    }
  }, [])

  async function authenticate(email: string, password: string) {
    try {
      await LoginUser({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      }).then((res) => {
        const decoded: any = jwtDecode(res.data.loginUser.token)
        setLoggedInfo({
          ui: decoded.id,
          exp: new Date(decoded.exp * 1000).toISOString(),
        })

        document.cookie = `_bu_l=${JSON.stringify({ ui: decoded.id, exp: new Date(decoded.exp * 1000) })}; expires=${new Date(decoded.exp * 1000)}; Secure`
        document.cookie = `_bu_t=${res.data.loginUser.token}; expires=${new Date(decoded.exp * 1000)}; Secure`
      })
      return 'success'
    } catch (err) {
      return 'error'
    }
  }

  const logout = () => {
    setLoggedInfo(null)
    localStorage.clear()

    document.cookie = `_bu_l=${JSON.stringify({ ui: '', exp: new Date(0) })}; expires=${new Date(0)}; Secure`
    document.cookie = `_bu_t=''; expires=${new Date(0)}; Secure`
  }

  return <AuthContext.Provider value={{ ...loggedInfo, authenticate, logout }}>{children}</AuthContext.Provider>
}