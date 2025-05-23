import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserToken } from "../../../../Context/UserAuth.context"

export default function ProtectedRoute({children}:{children:React.ReactNode}){
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const { userAuth } = userContext;

    if(userAuth){
        return children
    }else{
      return  <Navigate to="/login"/>
    }
     
}
