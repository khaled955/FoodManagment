
import { RecipeDetailsProps } from "../../../../interfaces/interfaces";
import { FaTags, FaDollarSign } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import defaultImage from "../../../../assets/imags/loginbg.png";
import { baseURL, USER_FAV_URLS } from "../../../../Api/Url";
import useRole from "../../../../Hooks/useRole";
import toast from "react-hot-toast";
import axiosInstance from "../../../../Api/AxiosInstance";
import { isAxiosError } from "axios";
import { useState } from "react";

export default function RecipeDetails({handleHideRecipeDetailsView, currentRecipe,isFav,getAllFavList}: RecipeDetailsProps) {
const isAdmine = useRole()
const [isLoading, setIsLoading] = useState(false)





  function handleImage(path: string) {
    return path ? `${baseURL}/${path}` : defaultImage;
  }


  // function add recipes to fav list 
 async function handleAddRecipeToFavourites(recipeId:number){
  setIsLoading(true)
  const toastId = toast.loading("Waiting.....")

  try {
   
    const options = {
      method: "POST",
      url:USER_FAV_URLS.CREATE_FAV_RECIPE,
      data:{
        recipeId,
      }
    }

   await  axiosInstance.request(options)
      

toast.success(`${currentRecipe?.name} is Added Successfully 👌`)
getAllFavList()

  } catch (error) {
if(isAxiosError(error)){
  toast.error("Something went wrong")
}
   

  } finally{

    toast.dismiss(toastId)
    setIsLoading(false)
  }
}









  if (!currentRecipe) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-details-title"
      className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-start p-4 z-3"
    >
      <section
        className="bg-white rounded-4 shadow-lg p-4 position-relative w-100"
        style={{ maxWidth: "650px" }}
        aria-describedby="recipe-details-description"
      >
        {/* Close Button */}
        <button
          onClick={handleHideRecipeDetailsView}
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close recipe details"
        ></button>

{/* fav icon */}
{!isAdmine && isFav   && <div className="fav-icon position-absolute start-0 top-0 text-success fs-4 p-2">
  <i className="fa-solid fa-heart"></i>
</div>
}


        {/* Recipe Image */}
        <figure className="text-center mb-4 w-50 mx-auto rounded-circle overflow-hidden">
          <img
            src={handleImage(currentRecipe.imagePath)}
            alt={`Image of ${currentRecipe.name}`}
            className="shadow w-100"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
          <figcaption className="visually-hidden">{currentRecipe.name}</figcaption>
        </figure>

        {/* Recipe Name */}
        <header>
          <h2 id="recipe-details-title" className="fw-bold text-center text-dark mb-3">
            {currentRecipe.name}
          </h2>
        </header>

        {/* Recipe Description */}
        <p
          id="recipe-details-description"
          className="text-center text-secondary mb-4"
        >
          <strong>Description:</strong> {currentRecipe.description}
        </p>

        {/* Recipe Info Grid */}
        <div className="row text-center text-md-start" role="group" aria-label="Recipe metadata">
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Category">
              <MdCategory className="text-primary fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.category?.[0]?.name || "No Category"}
              </span>
            </div>
            <small className="text-muted">Category</small>
          </div>

          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Tag">
              <FaTags className="text-warning fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.tag?.name || "No Tag"}
              </span>
            </div>
            <small className="text-muted">Tag</small>
          </div>

          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Price">
              <FaDollarSign className="text-success fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.price} EGP
              </span>
            </div>
            <small className="text-muted">Price</small>
          </div>
        </div>


        {/*  favourite btn */}
      {!isAdmine &&   <div className="fav-btn text-center">
        <button className="btn btn-success" disabled={isLoading} onClick={()=>{
if(isFav){
toast(`${currentRecipe.name} is Already in Your Favourite List`)
}else{
  handleAddRecipeToFavourites(currentRecipe.id)
}

        }}>{isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>:"Add To Favourites"}</button>
      </div>}



      </section>
      
    </div>
  );
}
