import { ReactNode } from "react"
import { Navigate, Route, RouteProps, Outlet} from "react-router-dom"
import { useAuth } from "../contexts/auth.context";

interface Props {
    isAuth?:boolean
    path?:string,
    element?:any
}

export const ProtectedAgentDashboard = ({isAuth,...routeProps }: Props) => {
    const { user } = useAuth()
    if (!user)
        return(
            <Navigate to='/signin' replace />
        )
    return <Outlet />
}
