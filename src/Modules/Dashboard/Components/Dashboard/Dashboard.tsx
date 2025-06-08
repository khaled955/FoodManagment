import dashboardimg from "../../../../assets/imags/dashboardheader.png"
import { useContext } from "react"

import { jwtDecode } from "jwt-decode"
import { Helmet } from 'react-helmet-async';
import { UserToken } from "../../../../Context/UserAuth.context";
import { UserAuthTokenPayload } from "../../../../interfaces/interfaces";
import Header from "../../../Shared/Components/Header/Header";
import Chart from "../Chart/Chart";
import useRole from "../../../../Hooks/useRole";
import { Link } from "react-router-dom";

const dashboardHeaderOne = "Welcome"

const dashBoardText = "This is a welcoming screen for the entry of the application , you can now see the options"


export default function Dashboard() {
 const isAdmine = useRole()
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

   
  {isAdmine &&  <Chart/>}
  {!isAdmine && <>
  <div className="d-flex justify-content-between align-items-center p-4 user-home my-3 rounded-1">
<div className="text">
      <h3 className="h5">Show the <span className="text-success">Recipes !</span></h3>
    <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
</div>
<div className="link">
  <Link className="btn btn-success" to="/dashboard/recipes"> All The Recipes</Link>
</div>
  </div>
  
  
  </>}
   </>
  )
}
