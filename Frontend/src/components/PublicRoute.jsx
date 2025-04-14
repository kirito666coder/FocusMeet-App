import { useContext } from "react"
import { AuthContext } from "../context/Authprovider"
import { Navigate } from "react-router-dom"



const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext)
  return user ? <Navigate to="/"/>: children
}

export default PublicRoute
