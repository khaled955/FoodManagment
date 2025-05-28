import Header from "../../Shared/Components/Header/Header"
import dashboardimg from "../../../assets/imags/dashboardheader.png"
import { useContext } from "react"
import { UserToken } from "../../../Context/UserAuth.context"
import { UserAuthTokenPayload } from "../../../interfaces/interfaces"
import { jwtDecode } from "jwt-decode"
import {Helmet} from "react-helmet";

const dashboardHeaderOne = "Welcome"

const dashBoardText = "This is a welcoming screen for the entry of the application , you can now see the options"


export default function Dashboard() {

// Auth Context 
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const { userAuth} = userContext;





function getUserDecoded(){
  if(!userAuth) return ""
  const decoded:UserAuthTokenPayload = jwtDecode(userAuth);
  return decoded.userName
}







  return (
   <>


       <Helmet>
        <title>Home</title>
        <meta name="description" content="food-managment-website" />
    </Helmet>
          <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={getUserDecoded()} text ={dashBoardText}/>

   
   
   </>
  )
}
