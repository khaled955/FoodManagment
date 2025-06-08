/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react"
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
import { Helmet } from 'react-helmet-async';
import { debounce } from "lodash"
import Pagination from "../../../Shared/Components/Pagination/Pagination.tsx"
import useRole from "../../../../Hooks/useRole.tsx"
import { useNavigate } from "react-router-dom"

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
const [currentPage , setCurrentPage] = useState(1)
const [totalNumberOfPages , setTotalNumberOfPages] = useState(1)
const [searchQuery , setSearchQuery] = useState("")
const isAdmine = useRole()
const navigate = useNavigate()
const {handleGetDataByAdmin} = useContext(AdminActions)!;
const {categoryList,handleSortCategoriesByName,handleReverseCategoriesByName} = useContext(AdminActions)!;









useEffect(()=>{
  if(!isAdmine) return 
async function fetchData(){
   const data = await handleGetDataByAdmin(CATEGORIES_URL.GET_ALL_CATEGORIES(5,currentPage,searchQuery))
  setTotalNumberOfPages(data.totalNumberOfPages)

}

fetchData()
},[currentPage,searchQuery])


//  start logic handle search by Name input
function handleSearchByName(e:React.ChangeEvent<HTMLInputElement>){
  
const query = e.target.value
setSearchQuery(query)
setCurrentPage(1)
debounceSearchByName(e.target.value)

}

// debounce function for search by name 

const debounceSearchByName = useMemo(()=>{

return debounce((query:string)=>{
handleGetDataByAdmin(CATEGORIES_URL.GET_ALL_CATEGORIES(5,1,query))
},300)


},[currentPage])


// clean up debounce function 


useEffect(()=>{
  return ()=>{
    debounceSearchByName.cancel()
  }
},[debounceSearchByName])



// End logic of search by name inpute













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


// handle Deeplinking

useEffect(() => {
  if (!isAdmine) {

    navigate("/dashboard");
    return 
  }
}, [isAdmine, navigate]);




if(!categoryList) return <Loading/>

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

  {/*  Search box */}
  
  <div className="search-box d-flex gap-1 mb-3">
    <input onChange={(e)=>{handleSearchByName(e)}} value={searchQuery} className="flex-grow-1" type="text"  placeholder="Search By Name ...."/>
  
   
  
  
  </div>
  
   
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


{/*  pagination  */}

<Pagination currentPage={currentPage} totalPages={totalNumberOfPages} onPageChange={setCurrentPage}/>






</section>



   </>






  )
}
