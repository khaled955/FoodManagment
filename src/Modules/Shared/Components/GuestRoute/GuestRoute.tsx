import { ReactNode, useContext } from "react";
import { UserToken } from "../../../../Context/UserAuth.context";
import { Navigate } from "react-router-dom";

export default function GuestRoute({children}:{children:ReactNode}) {

  // Auth Context 
  const userContext = useContext(UserToken);
  
    if (!userContext) {
      throw new Error("ProtectedRoute must be used within a UserAuthProvider");
    }
  
    const {userAuth} = userContext;

  if(userAuth) return  <Navigate to="/dashboard"/>
   if(! userAuth) return children

 
}
