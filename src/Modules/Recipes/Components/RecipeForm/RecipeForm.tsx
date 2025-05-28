/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import axiosInstance from "../../../../Api/AxiosInstance"
import { Category, FoodItem, RecipeFormData, Tag } from "../../../../interfaces/interfaces"
import { AdminActions } from "../../../../Context/AdminActions.context"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { isAxiosError } from "axios"
import { baseURL, CATEGORIES_URL, RECIPES_URLS, TAGS_URLS } from "../../../../Api/Url"
import { useNavigate } from "react-router-dom"

export default function RecipeForm({recipestate,recipeInfo}:{recipestate:string,recipeInfo:FoodItem}) {
const [tagList , setTagList] = useState<Tag[]>([])
const navigate = useNavigate()
const [reviewImage , setReviewImage] = useState<string | null>()

const {register,formState:{errors,isSubmitting},handleSubmit,watch}= useForm<RecipeFormData>({mode:"onChange",defaultValues:{name:recipeInfo? recipeInfo.name:"",description: recipeInfo ?recipeInfo.description:"",
    price:recipeInfo? recipeInfo.price?.toString() :"",categoriesIds:recipeInfo?recipeInfo.category[0].id.toString():"",
}})









const {categoryList,handleGetDataByAdmin}= useContext(AdminActions)!;

 async function getTagList(){
    const {data} = await axiosInstance.get(TAGS_URLS.GET_ALL_TAGS)
    setTagList(data)
}

// get tagList for select input
useEffect(()=>{
    getTagList()
},[])


// get all categories for select input
useEffect(()=>{
    handleGetDataByAdmin(CATEGORIES_URL.GET_ALL_CATEGORIES(10,1))
},[])

// set DefaultImage when update
useEffect(()=>{
if( recipeInfo?.imagePath)
setReviewImage(`${baseURL}/${recipeInfo.imagePath}`)

},[recipeInfo])


// Update preview when user selects a new image

const watchImage = watch("recipeImage");

useEffect(() => {
  if (watchImage && watchImage.length > 0) {
    const file = watchImage[0];
    const previewUrl = URL.createObjectURL(file);
    setReviewImage(previewUrl);

    // Clean up memory
    return () => URL.revokeObjectURL(previewUrl);
  }
}, [watchImage]);


// handle Data into FormData

function handleConvertDataIntoFormData(data:RecipeFormData){
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("description", data.description)
    formData.append("categoriesIds", data.categoriesIds)
    formData.append("recipeImage", data.recipeImage[0])
    formData.append("tagId", data.tagId)
    return formData
}



// handle Create New Recipe

 async function handleCreateNewRecipe(data:RecipeFormData){
const toastId = toast.loading("Waiting......")

try {
    const formData = handleConvertDataIntoFormData(data)
    console.log(formData)
    const {data:response} = await axiosInstance.post(RECIPES_URLS.CREATE_RECIPE,formData)
    toast.success(response.message)
    setTimeout(()=>{
        navigate("/dashboard/recipes")
    },2000)
} catch (error) {
    if(isAxiosError(error))
    toast.error(error.message)
console.log(error)
}finally{
    toast.dismiss(toastId)
}


}


//hanle update Current Recipe 

 async function handleUpdateCurrentRecipe(data:RecipeFormData,recipeId:number){
const toastId = toast.loading("Waiting......")

try {
    const formData = handleConvertDataIntoFormData(data)
    const {data:response} = await axiosInstance.put(RECIPES_URLS.UPDATE_RECIPES_BY_ID(recipeId),formData)
    
    toast.success( response.message || "Recipe Updated Successfully 👌")

    setTimeout(()=>{
        navigate("/dashboard/recipes")
    },2000)
} catch (error) {
    if(isAxiosError(error))
    toast.error(error.message)
console.log(error)
}finally{
    toast.dismiss(toastId)
}


}


function handleSubmitForm(data:RecipeFormData){
    if(recipestate === "Add"){
        handleCreateNewRecipe(data)

    }

    if(recipestate === "Update" && recipeInfo){
        handleUpdateCurrentRecipe(data,recipeInfo.id)
    }
    
}


  return (



<section className="container my-3 py-2 px-1" aria-labelledby="recipe-form-heading">
  <h2 id="recipe-form-heading" className="visually-hidden">Recipe Form</h2>

  <form
    className="d-flex flex-column gap-2"
    onSubmit={handleSubmit(handleSubmitForm)}
    aria-describedby="form-description"
  >
    <p id="form-description" className="visually-hidden">Use this form to add or update a recipe including name, tag, category, price, description, and image.</p>

    <fieldset>
      <legend className="visually-hidden">Recipe Basic Info</legend>

      {/* Name */}
      <div>
        <input
          id="recipeName"
          type="text"
          className="form-control"
          placeholder="Recipe Name"
          aria-required="true"
          {...register("name", { required: "Name Is Required" })}
        />
        {errors.name && <p className="auth-error-message">{errors.name.message}</p>}
      </div>

      {/* Tag */}
      <div>
        <select
          id="tagId"
          className="form-control"
          aria-required="true"
          defaultValue=""
          {...register("tagId", { required: "Tag Is Required" })}
        >
          <option disabled value="">Select Tag</option>
          {tagList.map((tag: Tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        {errors.tagId && <p className="auth-error-message">{errors.tagId.message}</p>}
      </div>

      {/* Price */}
      <div>
        <input
          id="price"
          type="number"
          className="form-control"
          placeholder="Price"
          aria-required="true"
          {...register("price", { required: "Price Is Required" })}
        />
        {errors.price && <p className="auth-error-message">{errors.price.message}</p>}
      </div>

      {/* Category */}
      <div>
        <select
          id="categoriesIds"
          className="form-control"
          aria-required="true"
          defaultValue=""
          {...register("categoriesIds", { required: "Category Is Required" })}
        >
          <option disabled value="">Select Category Of Recipes</option>
          {categoryList?.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoriesIds && <p className="auth-error-message">{errors.categoriesIds.message}</p>}
      </div>

      {/* Description */}
      <div>
        <textarea
          id="description"
          className="form-control"
          placeholder="Description"
          aria-required="true"
          {...register("description", { required: "Description Is Required" })}
        />
        {errors.description && <p className="auth-error-message">{errors.description.message}</p>}
      </div>

      {/* Image Upload */}
      <div className="container overflow-hidden">
        <div className="row justify-content-center label-box py-3">
          <div className="col-md-10 text-center">
            <label
              htmlFor="file"
              className="text-center py-2 fw-bold label-file"
            >
              Drag & Drop or Choose an <span className="text-success">Item Image to Upload</span>
              <i className="fa-solid fa-arrow-up-from-bracket fs-5 ms-2"></i>
            </label>
          </div>
          <div className="col-1">
            <input
              id="file"
              type="file"
              aria-describedby="fileHelp"
              {...register("recipeImage", {
                validate: (files) =>
                  recipestate === "Add"
                    ? files && files.length > 0 || "Image Is Required"
                    : true,
              })}
            />
          </div>
        </div>
        {errors.recipeImage && <p className="auth-error-message">{errors.recipeImage.message}</p>}
      </div>
    </fieldset>

    {/* Preview */}
    {reviewImage && (
      <figure className="text-center">
        <img
          src={reviewImage}
          alt="Preview of uploaded recipe"
          className="img-fluid rounded my-2"
          style={{ maxHeight: "150px" }}
        />
        <figcaption className="visually-hidden">Preview of uploaded image</figcaption>
      </figure>
    )}

    {/* Actions */}
    <div className="action-recipe-btn d-flex justify-content-between align-items-center">
      <button
        disabled={isSubmitting}
        className="btn btn-danger"
        type="submit"
        aria-label={recipestate === "Add" ? "Save Recipe" : "Update Recipe"}
      >
        {isSubmitting ? (
          <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
        ) : recipestate === "Add" ? "Save" : "Update"}
      </button>
      <button
        onClick={() => {
          navigate("/dashboard/recipes");
        }}
        className="btn btn-outline-danger"
        type="button"
        aria-label="Cancel and go back"
      >
        Cancel
      </button>
    </div>

    
  </form>
</section>

  )
}
