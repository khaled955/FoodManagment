/* eslint-disable @typescript-eslint/no-explicit-any */

import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header"
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionBtnGroup from "../../../Shared/Components/ActionBtnGroup/ActionBtnGroup"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Category, FavRecipe, FoodItem, RecipeListActionProps, Tag } from "../../../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../../Api/AxiosInstance"
import { baseURL, CATEGORIES_URL, RECIPES_URLS, TAGS_URLS, USER_FAV_URLS } from "../../../../Api/Url.tsx"
import Loading from "../../../Shared/Components/Loading/Loading.tsx"
import DeletConfirmationModal from "../../../Shared/Components/DeletConfirmationModal/DeletConfirmationModal.tsx"
import toast from "react-hot-toast"
import { isAxiosError } from "axios"

import defaultImage from "../../../../assets/imags/logo.png"
import RecipeDetails from "../RecipeDetails/RecipeDetails.tsx"
import { Helmet } from 'react-helmet-async';
import useRole from "../../../../Hooks/useRole.tsx"
import { AdminActions } from "../../../../Context/AdminActions.context.tsx"
import { debounce } from "lodash"
import Pagination from "../../../Shared/Components/Pagination/Pagination.tsx"



const dashboardHeaderOne = "Recipes"
const dashboardHeaderTwo = "Items"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"
const Image_Url = `${baseURL}/`

export default function RecipesList({handleSetRecipeUpdateAction}:RecipeListActionProps) {
const [recipesList, setRecipesList] = useState<FoodItem[]| null>(null)
const [currentId,setCurrentId] = useState(0)
const [currentRecipe , setCurrentRecipe] = useState<FoodItem | null>(null)
const [showDeleteConfirmation , setShowDeleteConfirmation] = useState(false)
const [actionDeletType] = useState("recipes")
const [showRecipeDetailsView , setRecipeDetailsView] = useState(false)
const [isSorted , setIsSorted] = useState(false)
const [isPriceSorted , setIsPriceSorted] = useState(false)
const [currentPage , setCurrentPage] = useState(1)
const [totalNumberOfPages , setTotalNumberOfPages] = useState(1)
const [tagList , setTagList] = useState([])
const [searchQuery , setSearchQuery] = useState("")
const [searchqueryTag,setSearchQueryTag] = useState("")
const [searchQueryCategory , setSearchQueryCategory] = useState("")
const [favList , setFavList] = useState<FavRecipe[]>([])
const [isFav , setIsFav] = useState(false)
const navigate = useNavigate()
const [isLoading , setIsLoading] = useState(false)
const isAdmine = useRole()
const {categoryList,handleGetDataByAdmin:handleGetAllCategories}= useContext(AdminActions)!;





//  get all tags
 async function getTagList(){
    const {data} = await axiosInstance.get(TAGS_URLS.GET_ALL_TAGS)
    setTagList(data)
}

// get tagList for select input
useEffect(()=>{
    getTagList()
},[])




// get all categories in select input field
useEffect(()=>{
    handleGetAllCategories(CATEGORIES_URL.GET_ALL_CATEGORIES(10,1))
},[handleGetAllCategories])






// Get All Recipes 

 async function handleGetDataByAdmin(url:string):Promise<any>{

try {
    const options = {
        url,
        method:"GET",
    }

    const {data} = await axiosInstance.request(options)
    setRecipesList(data.data)
    setTotalNumberOfPages(data.totalNumberOfPages)
    
} catch (error) {
    if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some thing go wronge")
    }
}





    }
    




useEffect(()=>{


  

handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(4,currentPage))


},[currentPage])


// Delet Recipes

 async function handleDeleteRecipesByAdmin(deletUrl:string, msg:string){
  const toastId = toast.loading("Waiting")
  setIsLoading(true)
try {
    const options = {
        url:deletUrl,
        method:"DELETE",
        
        
    }

     await axiosInstance.request(options)
    toast.success(msg)
     await handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(10,1))
    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || "Some thing go wronge")
    }


}finally{
        toast.dismiss(toastId)
        setIsLoading(false)
    }







}





















function handleNavigateToRecipeData(){
  navigate('/dashboard/recipe-data',{state:{recipeAction:"Add"}})
}


function handleSetCurrentId(current:number){
setCurrentId(current)
}


function handleShowDeletModal(){
  setShowDeleteConfirmation(true)
}
function handleHideDeletModal(){
  setShowDeleteConfirmation(false)
}




function handleHideRecipeDetailsView(){
  setRecipeDetailsView(false)
}



function hanldleViewClick(current:FoodItem){
  setCurrentRecipe(current)
  setRecipeDetailsView(true)
}




// sort Recipes name alphabetical 

function handleSortRecipesByName(){
   if (recipesList) {
  const sortedRecipesList = [...recipesList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  setRecipesList(sortedRecipesList);
}

}


function handleReverseRecipesByName(){
   if (recipesList) {
  const sortRecipesList = [...recipesList].sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  setRecipesList(sortRecipesList);
}

}



//  sort recipes according to price 


function handleSortRecipesByPrice(){
   if (recipesList) {
  const sortedRecipesList = [...recipesList].sort((a:FoodItem, b:FoodItem) =>
    Number(a.price) - Number(b.price)
  );

  setRecipesList(sortedRecipesList);
}

}








function handleReverseRecipesByPrice(){
   if (recipesList) {
  const sortRecipesList = [...recipesList].sort((a, b) =>
    Number(b.price) - Number(a.price)
  );

  setRecipesList(sortRecipesList);
}

}




function handleImage(path:string){
  if(path) {
    return Image_Url+path
}else{
  return defaultImage
}
}


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
handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(4,currentPage,query))
},300)


},[currentPage])


// clean up debounce function 


useEffect(()=>{
  return ()=>{
    debounceSearchByName.cancel()
  }
},[debounceSearchByName])



// End logic of search by name inpute


// handlefilterBy Tag Name

function handleFilterByTagName(e:React.ChangeEvent<HTMLSelectElement>){
  
const query = e.target.value
  setSearchQueryTag(query)
handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(4,currentPage,searchQuery,e.target.value,searchQueryCategory))

}


// handle filter By Category Name


function handleFilterByCategoryName(e:React.ChangeEvent<HTMLSelectElement>){
  
const query = e.target.value
  setSearchQueryCategory(query)
handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(4,currentPage,searchQuery,searchqueryTag,e.target.value))

}


// check if current recipe in favourite List 

// function get all fav recipes 

async function getAllFavList(){
  try {
    const {data} = await axiosInstance.get(USER_FAV_URLS.GET_FAV_RECIPES)
    setFavList(data.data)
  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.message || "Some thing go wrong")
    }
  }
}

useEffect(()=>{
  if(isAdmine) return 
  getAllFavList()
},[currentRecipe?.id,isAdmine])



const checkRecipeInFavList = useCallback((id: number) => {
 
const isInFavList = favList.some((fav:FavRecipe)=> fav.recipe.id === id)
  return isInFavList
}, [favList]); 





useEffect(() => {
  if (currentRecipe) {
     const isInFav = checkRecipeInFavList(currentRecipe.id);
    setIsFav(isInFav)
  }
}, [currentRecipe, checkRecipeInFavList]);
















if(!recipesList) return <Loading/>



return (
  <>

  <Helmet>
      <title>Recipes | Food Management</title>
      <meta name="description" content="View, add, and manage delicious recipes with pricing and categories." />
      <meta name="keywords" content="recipes, food items, cooking, meal management" />
      <meta property="og:title" content="Recipe Management | Food Dashboard" />
      <meta property="og:description" content="Organize and explore all recipes with easy controls and detailed views." />
      <meta property="og:type" content="website" />
    </Helmet>






    <Header
      imgePath={dashboardimg}
      titleOne={dashboardHeaderOne}
      titleTwo={dashboardHeaderTwo}
      text={dashBoardText}
    />

    <section
      aria-labelledby="recipes-section-title"
      className="px-2 py-3 rounded-2 my-2 body-box d-flex justify-content-between align-items-center"
    >
      <div className="body-text">
        <h2 id="recipes-section-title" className="h5">
          Recipes Table Details
        </h2>
        <p className="text-info">You can check all details</p>
      </div>
      <div className="body-btn">
      {isAdmine &&   <button
          className="btn btn-success"
          onClick={handleNavigateToRecipeData}
          aria-label="Add new recipe"
        >
          Add New Item
        </button>}
      </div>
    </section>

    {showRecipeDetailsView && (
      <RecipeDetails
        currentRecipe={currentRecipe}
        handleHideRecipeDetailsView={handleHideRecipeDetailsView}
        isFav={isFav}
        getAllFavList={getAllFavList}
      />
    )}

    {showDeleteConfirmation && (
      <DeletConfirmationModal
        type="Recipe"
        onClick={handleHideDeletModal}
        currentId={currentId}
        handleHideDeletModal={handleHideDeletModal}
        actionDeletType={actionDeletType}
        handleDeleteRecipesByAdmin={handleDeleteRecipesByAdmin}
        deleteLoading={isLoading}
      />
    )}


{/*  Search box */}

<div className="search-box d-flex gap-1 mb-3">
  <input onChange={(e)=>{handleSearchByName(e)}} value={searchQuery} className="flex-grow-1" type="text"  placeholder="Search By Name ...."/>

  <select  value={searchqueryTag} onChange={(e)=>{handleFilterByTagName(e)}}>
    <option disabled value="">Filter By Tage Name</option>
    <option value="">All Tags</option>
    {tagList.map((tag:Tag)=><option key={tag.id} value={tag.id}>{tag.name}</option>)}
  </select>

<select value={searchQueryCategory} onChange={(e)=>{handleFilterByCategoryName(e)}}>
  <option disabled value=""> Filter By Category</option>
  <option value=""> All Category</option>
  {categoryList?.map((cat:Category)=><option key={cat.id} value={cat.id}>{cat.name}</option>)}
</select>


</div>



    <main role="main" aria-label="Recipes table section">
      {recipesList.length > 0 ? (
        <div className="table-box">
          <table className="table table-responsive text-center align-middle" aria-describedby="recipes-table-desc">
            <caption id="recipes-table-desc" className="visually-hidden">
              List of all recipes with name, image, price, description, tag, category, and actions
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    Item Name
                    {isSorted ? (
                      <i
                        onClick={() => {
                          setIsSorted(false);
                          handleSortRecipesByName();
                        }}
                        className="fa-solid fa-caret-up"
                        role="button"
                        aria-label="Sort item names ascending"
                        tabIndex={0}
                      />
                    ) : (
                      <i
                        onClick={() => {
                          setIsSorted(true);
                          handleReverseRecipesByName();
                        }}
                        className="fa-solid fa-caret-down"
                        role="button"
                        aria-label="Sort item names descending"
                        tabIndex={0}
                      />
                    )}
                  </div>
                </th>
                <th scope="col">Image</th>
                <th scope="col">
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    Price
                    {isPriceSorted ? (
                      <i
                        onClick={() => {
                          setIsPriceSorted(false);
                          handleReverseRecipesByPrice()
                        }}
                        className="fa-solid fa-caret-up"
                        role="button"
                        aria-label="Sort prices ascending"
                        tabIndex={0}
                      />
                    ) : (
                      <i
                        onClick={() => {
                          setIsPriceSorted(true);
                          handleSortRecipesByPrice()
                        }}
                        className="fa-solid fa-caret-down"
                        role="button"
                        aria-label="Sort prices descending"
                        tabIndex={0}
                      />
                    )}
                  </div>
                </th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe: FoodItem) => (
                <tr key={recipe.id}>
                  <td className="recipe-table-name">{recipe.name}</td>
                  <td>
                    <figure className="m-0">
                      <img
                        className="recipe-img"
                        src={handleImage(recipe.imagePath)}
                        alt={recipe.description || recipe.name}
                      />
                      <figcaption className="visually-hidden">
                        {recipe.name} preview
                      </figcaption>
                    </figure>
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category[0].name}</td>
                  <td>
                   <ActionBtnGroup
                      handleSetCurrentId={handleSetCurrentId}
                      handleShowDeletModal={handleShowDeletModal}
                      recipeInfo={recipe}
                      handleSetRecipeUpdateAction={handleSetRecipeUpdateAction}
                      hanldleViewClick={hanldleViewClick}
                    /> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </div>
      ) : (
         
                      <div className="d-flex justify-content-center align-items-center">
                        <NoData />
                  
                      </div>
      )}

{/*  pagination  */}

<Pagination currentPage={currentPage} totalPages={totalNumberOfPages} onPageChange={setCurrentPage}/>



    </main>
  </>
);



}



