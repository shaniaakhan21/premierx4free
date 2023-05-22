import { jsx } from "@emotion/react"
import { Children, Component } from "react"
import { useNavigate,Navigate} from "react-router-dom"

interface props{
    children:any
}

export const ProtectedAgentDashboard:React.FC<props> = ({children}) => {
    const userAgent = localStorage.getItem('data')
    const navigate = useNavigate()
    if (userAgent=="" || userAgent==undefined)
    return(
        <Navigate to='/signin' replace />
    )
    return children
}