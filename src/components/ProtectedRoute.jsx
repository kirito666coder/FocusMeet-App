import { Navigate } from "react-router-dom";

const ProtectedRoute = ({user,children})=>{

    return user?children : <Navigate to="/login"/>
}

export default ProtectedRoute;