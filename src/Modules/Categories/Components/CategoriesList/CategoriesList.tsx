/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import ActionBtnGroup from "../../../Shared/Components/ActionBtnGroup/ActionBtnGroup"
import Body from "../../../Shared/Components/Body/Body"
import Header from "../../../Shared/Components/Header/Header"
import { AdminActions } from "../../../../Context/AdminActions.context"
import { Category } from "../../../../interfaces/interfaces"
import Loading from "../../../Shared/Components/Loading/Loading"
import NoData from "../../../Shared/Components/NoData/NoData"
import AddAndUpdateForm from "../../../Shared/Components/AddAndUpdateForm/AddAndUpdateForm"
import DeletConfirmationModal from "../../../Shared/Components/DeletConfirmationModal/DeletConfirmationModal"
import CategoryDetailsView from "../CategoryDetailsView/CategoryDetailsView.tsx"

const dashboardHeaderOne = "Categories"
const dashboardHeaderTwo = "Items"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"

const URL = "/api/v1/Category/?pageSize=10&pageNumber=1"


export default function CategoriesList() {
const[showUpdateAndAddForm,setshowUpdateAndAddForm] = useState(false)
const[updateAndAddFormTitle,setUpdateAndAddFormTitle] = useState("")
const[updateAndAddFormBtnText,setUpdateAndAddFormBtnText] = useState("")
const [updateAndAddFormHeader,setUpdateAndAddFormHeader] = useState("")
const [currentId,setCurrentId] = useState(0)
const [currentCategory , setCurrentCategory] = useState<Category>()
const [showDeleteConfirmation , setShowDeleteConfirmation] = useState(false)
const [actionDeletType] = useState("category")
const [showCategoryDetailsView , setCategoryDetailsView] = useState(false)
const [isSorted , setIsSorted] = useState(false)



const {handleGetDataByAdmin} = useContext(AdminActions)!;
const {categoryList,handleSortCategoriesByName,handleReverseCategoriesByName} = useContext(AdminActions)!;


useEffect(()=>{


  


handleGetDataByAdmin(URL)

},[])





if(!categoryList) return <Loading/>


function handleShowUpdateAndUpdateForm(){
  setshowUpdateAndAddForm(true)
}

function handleHideUpdateAndUpdateForm(){
  setshowUpdateAndAddForm(false)
}

function handleAddTitleAndBtnTextForm(){
 setUpdateAndAddFormBtnText("Add Category")
 setUpdateAndAddFormTitle("Add New Category")

}
function handleUpdateTitleAndBtnTextForm(){
 setUpdateAndAddFormBtnText("Update Now")
 setUpdateAndAddFormTitle("Update Category")
setshowUpdateAndAddForm(true)
}


function handleUpdateAndAddFormHeader(headerName:string){
setUpdateAndAddFormHeader(headerName)
}


function handleSetCurrentId(current:number){
setCurrentId(current)
}



function handleSetCurrentCategory(currentCat:Category){
  setCurrentCategory(currentCat)
}



function handleShowDeletModal(){
  setShowDeleteConfirmation(true)
}
function handleHideDeletModal(){
  setShowDeleteConfirmation(false)
}

function handleShowCategoryDetailsView(){
  setCategoryDetailsView(true)
}

function handleHideCategoryDetailsView(){
  setCategoryDetailsView(false)
}






  return (
   <>
   <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>
   <Body handleAddTitleAndBtnTextForm={handleAddTitleAndBtnTextForm} header="Categories Table Details" description="You can check all details" item="Category" onClick={handleShowUpdateAndUpdateForm} handleUpdateAndAddFormHeader={handleUpdateAndAddFormHeader} />
   

{showUpdateAndAddForm && <AddAndUpdateForm title={updateAndAddFormTitle} btnText={updateAndAddFormBtnText} onClick={handleHideUpdateAndUpdateForm} updateAndAddFormHeader={updateAndAddFormHeader} currentId={currentId} handleHideUpdateAndUpdateForm={handleHideUpdateAndUpdateForm}/>
}


{showDeleteConfirmation && <DeletConfirmationModal onClick={handleHideDeletModal} currentId={currentId} handleHideDeletModal={handleHideDeletModal} actionDeletType={actionDeletType}/>}



{showCategoryDetailsView && <CategoryDetailsView onClick={handleHideCategoryDetailsView} currentCategory={currentCategory}/>}

   {/*  table to display categories */}

   <div className="table-box">
    <table className=" table table-responsive text-center">
      <thead>
        <tr>
          <th className="d-flex align-items-center justify-content-center gap-1">Name {isSorted ? <i onClick={()=>{
            setIsSorted(false)
            handleSortCategoriesByName()

          }} className="fa-solid fa-caret-up"></i>:<i  onClick={()=>{
            setIsSorted(true)
               handleReverseCategoriesByName()

          }} className="fa-solid fa-caret-down"></i>}</th>
          <th>Creation Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
       { categoryList.length > 0 ? categoryList.map((category:Category)=>  <tr key={category.id}>
          <td>{category.name} </td>
          <td>{new Date(category.creationDate).toLocaleDateString()}-{new Date(category.creationDate).toLocaleTimeString()}</td>
          <td><ActionBtnGroup handleUpdateTitleAndBtnTextForm={handleUpdateTitleAndBtnTextForm} handleUpdateAndAddFormHeader={handleUpdateAndAddFormHeader} catDetails={category} handleSetCurrentId={handleSetCurrentId} handleSetCurrentCategory={handleSetCurrentCategory} 
          handleShowCategoryDetailsView={handleShowCategoryDetailsView}
          handleShowDeletModal={handleShowDeletModal}/></td>
        </tr>):<NoData/>}
      </tbody>
    </table>
   </div>
   
   </>
  )
}
