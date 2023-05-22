import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth.context";

interface Props {
    children: ReactNode
}

export const ProtectedAgentDashboard = ({ children }: Props) => {
    const { user } = useAuth()
    if (!user)
        return(
            <Navigate to='/signin' replace />
        )
    return children
}
