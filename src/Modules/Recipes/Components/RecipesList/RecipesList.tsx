
import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header"

const dashboardHeaderOne = "Recipes"
const dashboardHeaderTwo = "Items"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"


export default function RecipesList() {
  return (
    <>
              <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>

    
    
    </>
  )
}
