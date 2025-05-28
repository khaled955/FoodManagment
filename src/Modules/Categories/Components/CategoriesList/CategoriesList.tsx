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
import { CATEGORIES_URL } from "../../../../Api/Url.tsx"
import { Helmet } from "react-helmet"

const dashboardHeaderOne = "Categories"
const dashboardHeaderTwo = "Items"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"



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


  


handleGetDataByAdmin(CATEGORIES_URL.GET_ALL_CATEGORIES(10,1))

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

 <Helmet>
      <title>Categories | Food Management</title>
      <meta name="description" content="Browse all recipe categories available in our food management platform." />
      <meta name="keywords" content="recipe categories, food management, cooking, meal types" />
      <meta property="og:title" content="Explore Categories | Food Management" />
      <meta property="og:description" content="Discover recipe categories to help organize and manage your food items." />
      <meta property="og:type" content="website" />
    </Helmet>



   <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>
   <Body handleAddTitleAndBtnTextForm={handleAddTitleAndBtnTextForm} header="Categories Table Details" description="You can check all details" item="Category" onClick={handleShowUpdateAndUpdateForm} handleUpdateAndAddFormHeader={handleUpdateAndAddFormHeader} />
   

{showUpdateAndAddForm && <AddAndUpdateForm title={updateAndAddFormTitle} btnText={updateAndAddFormBtnText} onClick={handleHideUpdateAndUpdateForm} updateAndAddFormHeader={updateAndAddFormHeader} currentId={currentId} handleHideUpdateAndUpdateForm={handleHideUpdateAndUpdateForm}/>
}


{showDeleteConfirmation && <DeletConfirmationModal type="Category" onClick={handleHideDeletModal} currentId={currentId} handleHideDeletModal={handleHideDeletModal} actionDeletType={actionDeletType}/>}



{showCategoryDetailsView && <CategoryDetailsView onClick={handleHideCategoryDetailsView} currentCategory={currentCategory}/>}

   {/*  table to display categories */}

  
   
<section className="table-box" aria-labelledby="category-table-heading">
  <table className="table table-responsive text-center">
    <caption id="category-table-heading" className="visually-hidden">
      Categories table listing names, creation dates, and available actions.
    </caption>
    <thead>
      <tr>
        <th
          className="d-flex align-items-center justify-content-center gap-1"
          scope="col"
          aria-sort={isSorted ? "ascending" : "descending"}
        >
          Name{" "}
          {isSorted ? (
            <i
              onClick={() => {
                setIsSorted(false);
                handleSortCategoriesByName();
              }}
              className="fa-solid fa-caret-up"
              role="button"
              aria-label="Sort descending"
              tabIndex={0}
            ></i>
          ) : (
            <i
              onClick={() => {
                setIsSorted(true);
                handleReverseCategoriesByName();
              }}
              className="fa-solid fa-caret-down"
              role="button"
              aria-label="Sort ascending"
              tabIndex={0}
            ></i>
          )}
        </th>
        <th scope="col">Creation Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categoryList.length > 0 ? (
        categoryList.map((category: Category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>
              {new Date(category.creationDate).toLocaleDateString()} -{" "}
              {new Date(category.creationDate).toLocaleTimeString()}
            </td>
            <td>
              <ActionBtnGroup
                handleUpdateTitleAndBtnTextForm={handleUpdateTitleAndBtnTextForm}
                handleUpdateAndAddFormHeader={handleUpdateAndAddFormHeader}
                catDetails={category}
                handleSetCurrentId={handleSetCurrentId}
                handleSetCurrentCategory={handleSetCurrentCategory}
                handleShowCategoryDetailsView={handleShowCategoryDetailsView}
                handleShowDeletModal={handleShowDeletModal}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>
            <div aria-live="polite">
              <NoData />
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</section>



   </>






  )
}
