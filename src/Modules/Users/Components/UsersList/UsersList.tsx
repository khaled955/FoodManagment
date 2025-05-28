import { Helmet } from "react-helmet"
import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header"

const dashboardHeaderOne = "Users"
const dashboardHeaderTwo = "List"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"


export default function UsersList() {
  return (
   <>
  <Helmet>
      <title>Users | Food Management</title>
      <meta name="description" content="View, add, and manage delicious recipes with pricing and categories." />
      <meta name="keywords" content="users, food items, cooking, meal management" />
      <meta property="og:title" content="Users Management | Food Dashboard" />
      <meta property="og:description" content="Organize and explore all Users with easy controls and detailed views." />
      <meta property="og:type" content="website" />
    </Helmet>




<Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>

   
   </>
  )
}
