import { useCallback, useEffect, useState } from "react";
import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header";
import { Helmet } from 'react-helmet-async';
import axiosInstance from "../../../../Api/AxiosInstance";
import { USER_FAV_URLS } from "../../../../Api/Url";
import { FavRecipe } from "../../../../interfaces/interfaces";
import Loading from "../../../Shared/Components/Loading/Loading";
import NoData from "../../../Shared/Components/NoData/NoData";
import FavouriteCard from "../FavouriteCard/FavouriteCard";
import photo from "../../../../assets/imags/nodata.png"
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import useRole from "../../../../Hooks/useRole";
import { useNavigate } from "react-router-dom";






const dashboardHeaderOne = "Favorite"
const dashboardHeaderTwo = "Items"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"


export default function FavouritesList() {
const [favList , setFavList] = useState< FavRecipe[] | null>(null)
const [showDeleteModal , setShowDeleteModal] = useState(false)
const [selectedId , setSelectedId] = useState< number | null>(null)
const isAdmine = useRole()
const navigate = useNavigate()





const getAllFavList = useCallback(async () => {
  try {
    const { data } = await axiosInstance.get(USER_FAV_URLS.GET_FAV_RECIPES);
    setFavList(data.data);
  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.message || "Some thing go wronge")
    }
  }
}, []);




useEffect(() => {
  if (isAdmine) {

    navigate("/dashboard");
    return 
  }
}, [isAdmine, navigate]);






useEffect(()=>{
  getAllFavList()
},[getAllFavList])



function handleShowDeleteModal(){
  setShowDeleteModal(true)
}



function handleSetCurrentFav(favObj:FavRecipe){
setSelectedId(favObj.id)
}





 async function handleDeletFavRecipe(){

  if(!selectedId) return ;
  const toastId = toast.loading("Waiting.....")
   
try {
  const options = {
    url:USER_FAV_URLS.DELET_FAV_RECIPE_BT_ID(selectedId),
    method: 'DELETE',
    data:{
      id:selectedId
    }
  }

 await axiosInstance.request(options)

 getAllFavList()
 toast.success("Remove From Favourite List Successfully")


  
} catch (error) {
  
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some Thing Go Wronge") 
  }



  
}finally{
  toast.dismiss(toastId)
}








}











 if (!favList) return <Loading/>




  return (
   <>
    <Helmet>
         <title>Favourites | Food Management</title>
         <meta name="description" content="Browse allfavourites Recipes available in our food management platform." />
         <meta name="keywords" content="recipe categories, food management, cooking, meal types" />
         <meta property="og:title" content="Explore Recipes | Food Management" />
         <meta property="og:description" content="Discover recipe categories to help organize and manage your food items." />
         <meta property="og:type" content="website" />
       </Helmet>
   
      <Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>


{/*  Delete Modal Box */}
{showDeleteModal && <div
    className="position-fixed top-0 start-0 end-0 bottom-0 add-update-box row justify-content-center align-items-center"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
  >
    <section className="bg-white col-10 col-md-5 rounded-2 p-3 overflow-hidden position-relative shadow">
      {/* Close Button */}
      <button
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close delete confirmation"
        
      >
        <i onClick={()=> setShowDeleteModal(false)} className="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>

      {/* Image */}
      <figure className="text-center mb-3">
        <img className="w-75" src={photo} alt="Illustration for no data" />
        <figcaption className="visually-hidden">Confirmation illustration</figcaption>
      </figure>

      {/* Dialog Header */}
      <header>
        <h2 id="delete-dialog-title" className="h5 text-center">
          Remove  From Favourite List ?
        </h2>
      </header>

      {/* Dialog Description */}
      <p id="delete-dialog-description" className="text-center text-muted">
        Are you sure you want to Remove This Recipe? If you are sure, just click the button below to confirm.
      </p>

      {/* Delete Button */}
      <footer className="text-end mt-4">
        <button
          className="btn btn-danger"
        
          aria-label="Confirm delete item"
          onClick={()=>{
            handleDeletFavRecipe()

            setTimeout(()=>{
              setShowDeleteModal(false)
            },2000)
          }}
        >
         Remove
        </button>
      </footer>
    </section>
  </div>}






   
  {favList.length === 0 ? <NoData/> : <div className="fav-card-container row mt-3 gap-4">
{favList.map((fav: FavRecipe) => (
    <FavouriteCard key={fav.id} favInfo={fav} handleShowDeleteModal={handleShowDeleteModal}  handleSetCurrentFav={handleSetCurrentFav}/>
))}
   </div>}
   
   
   </>
  )
}
