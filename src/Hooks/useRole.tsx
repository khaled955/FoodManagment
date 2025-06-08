import { useContext} from "react";
import { UserToken } from "../Context/UserAuth.context";
import { UserAuthTokenPayload } from "../interfaces/interfaces";
import { jwtDecode } from "jwt-decode";

export default function useRole(){

// Auth Context 
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const {userAuth} = userContext;
 if(userAuth){
     const userDecoded :UserAuthTokenPayload = jwtDecode(userAuth)
     
       return userDecoded.roles[0] === "Admin"
 }




}