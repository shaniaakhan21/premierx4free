import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import User from "../models/user.model";
import {createCustomSetStateFn, loadLocalStorage} from "../helpers/ global";

type AuthContextType = {
  user?: User
  setUser: Dispatch<SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLocalStorage('user', setUser)
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser: createCustomSetStateFn('user', setUser) }}
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
