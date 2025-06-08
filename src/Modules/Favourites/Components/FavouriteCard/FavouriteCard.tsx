import { baseURL } from "../../../../Api/Url";
import { FavRecipe } from "../../../../interfaces/interfaces";

export default function FavouriteCard({favInfo,handleShowDeleteModal,handleSetCurrentFav}:{favInfo:FavRecipe,handleShowDeleteModal:()=>void,handleSetCurrentFav:(favObj:FavRecipe)=>void}) {

  return (
    <div className="col-md-3 shadow-sm rounded-2 position-relative">
      <div className="fav-icon position-absolute top-0 end-0">
<i onClick={()=>{
handleShowDeleteModal()
handleSetCurrentFav(favInfo)


}} title="Remove From Favourite List" className="fa-solid fa-heart fs-4 fav-remove"></i>
      </div>
      <div className="img">
        <img style={{ width: "100%", height: "200px", objectFit: "contain" }} src={`${baseURL}/${favInfo.recipe.imagePath}`} alt="" />
      </div>
      <div className="card-text my-4 border-top py-2 border-bottom text-center">
        <h2 className="h5 text-danger text-capitalize">{favInfo.recipe.name}</h2>
        <p className="text-capitalize">{favInfo.recipe.description}</p>
        <p></p>
      </div>
    </div>
  )
}
