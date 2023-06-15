import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import User from "../models/user.model";
import { createCustomSetStateFn, loadLocalStorage } from "../helpers/global";
import axios from "axios";
import {getAgentUser} from "../services/agent";

type AuthContextType = {
  user?: User
  refreshed: boolean
  setUser: Dispatch<SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  refreshed: false,
  setUser: () => {
  }
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)
  const [refreshed, setRefreshed] = useState(false)

  useEffect(() => {
    const data = loadLocalStorage<User>('user')
    if (data?.jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwtToken}`
      axios.defaults.baseURL = '/api/v1/'
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      if (!refreshed) getAgentUser(data, data?.userId).then((res) => {
        setUser(res.data)
        setRefreshed(true)
      })
      setUser(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user?.jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwtToken}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{ user, refreshed, setUser: createCustomSetStateFn('user', setUser) }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default AuthContext
