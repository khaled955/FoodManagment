/* eslint-disable @typescript-eslint/no-explicit-any */

import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header"
import NoData from "../../../Shared/Components/NoData/NoData"
import ActionBtnGroup from "../../../Shared/Components/ActionBtnGroup/ActionBtnGroup"
import { useEffect, useState } from "react"
import { FoodItem, RecipeListActionProps } from "../../../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../../Api/AxiosInstance"
import { baseURL, RECIPES_URLS } from "../../../../Api/Url.tsx"
import Loading from "../../../Shared/Components/Loading/Loading.tsx"
import DeletConfirmationModal from "../../../Shared/Components/DeletConfirmationModal/DeletConfirmationModal.tsx"
import toast from "react-hot-toast"
import { isAxiosError } from "axios"

import defaultImage from "../../../../assets/imags/logo.png"
import RecipeDetails from "../RecipeDetails/RecipeDetails.tsx"
import { Helmet } from "react-helmet"



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
const navigate = useNavigate()






















// Get All Recipes 

 async function handleGetDataByAdmin(url:string):Promise<any>{

try {
    const options = {
        url,
        method:"GET",
    }

    const {data} = await axiosInstance.request(options)
    setRecipesList(data.data)
    
} catch (error) {
    
console.log(error)

}





    }
    


useEffect(()=>{


  


handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(10,1))

},[])


// Delet Recipes

 async function handleDeleteRecipesByAdmin(deletUrl:string, msg:string){
  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:deletUrl,
        method:"DELETE",
        
        
    }

    const {data} = await axiosInstance.request(options)
    console.log(data)
    toast.success(msg)
     await handleGetDataByAdmin(RECIPES_URLS.GET_ALL_RECIPES(10,1))
    
} catch (error) {
    if(isAxiosError(error)){
        console.log(error)
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
    }







}
















if(!recipesList) return <Loading/>





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
        <button
          className="btn btn-success"
          onClick={handleNavigateToRecipeData}
          aria-label="Add new recipe"
        >
          Add New Item
        </button>
      </div>
    </section>

    {showRecipeDetailsView && (
      <RecipeDetails
        currentRecipe={currentRecipe}
        handleHideRecipeDetailsView={handleHideRecipeDetailsView}
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
      />
    )}

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
                          handleSortRecipesByPrice();
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
                          handleReverseRecipesByPrice();
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
        <NoData />
      )}
    </main>
  </>
);



}



