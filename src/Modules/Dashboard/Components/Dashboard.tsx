import Header from "../../Shared/Components/Header/Header"
import dashboardimg from "../../../assets/imags/dashboardheader.png"

const dashboardHeaderOne = "Welcome"
const dashboardHeaderTwo = "Upskilling !"

const dashBoardText = "This is a welcoming screen for the entry of the application , you can now see the options"


export default function Dashboard() {
  return (
   <>
          <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>

   
   
   </>
  )
}
