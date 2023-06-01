import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth.context";

interface ProtectedRotesProps {
  children: JSX.Element
}

export const ProtectedRotes = ({ children }: ProtectedRotesProps) => {
  const { user } = useAuth()

  if (!user)
    return (
      <Navigate to='/signin' replace />
    )
  return children;
}
