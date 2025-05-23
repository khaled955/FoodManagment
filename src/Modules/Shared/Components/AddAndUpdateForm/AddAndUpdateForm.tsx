
import { useForm } from "react-hook-form"
import { AdminActions } from "../../../../Context/AdminActions.context";
import { useContext } from "react";
import { MyformData } from "../../../../interfaces/interfaces";


const ADD_URL = "/api/v1/Category/"
const UPdate_URL = "/api/v1/Category/"

export default function AddAndUpdateForm({title,btnText , onClick ,updateAndAddFormHeader,currentId,handleHideUpdateAndUpdateForm}:{title:string,btnText:string ,onClick:()=>void,updateAndAddFormHeader:string,currentId:number,handleHideUpdateAndUpdateForm:()=>void}) {

const {handleAddDataByAdmin,handleUpdateDataByAdmin} = useContext(AdminActions)!;









const {handleSubmit,formState:{errors} , register} = useForm<MyformData>()












  return (
    <div className="position-fixed top-0 bottom-0 start-0 end-0 add-update-box row justify-content-center align-items-center">
      
        <div className="content-box col-10 col-md-6 position-relative">
            <div className="btn-close-btn-update-add-form position-absolute end-0 top-0 p-2 bg-black text-white fw-bold d-flex justify-content-center align-items-center">
             <i onClick={()=>{

               onClick()
             }} className="fa-solid fa-xmark"></i>
            </div>
        <h2 className="h4 fw-bold my-4">{title || "Add Category"} {updateAndAddFormHeader}</h2>
        <form onSubmit={handleSubmit((data)=>{

     if(title === "Add New Category"){
        
        handleAddDataByAdmin(data,ADD_URL,"New Category Add Successfully")
        setTimeout(()=>{
                  handleHideUpdateAndUpdateForm()

        },1000)
    }

    if(title === "Update Category"){
handleUpdateDataByAdmin(data,UPdate_URL,"Updated Category Done Successfully",currentId)
 setTimeout(()=>{
                  handleHideUpdateAndUpdateForm()

        },1000)

    }



        })}>
            <input
            {...register("name",{required:"Category Name Is Required"})}
            className="form-control" type="text" placeholder="Write Category Name...." />

            {errors.name && <p className=".auth-error-message">{errors.name.message}</p>}
            <button className="auth-btn my-4" type="submit">{btnText || "Save"}</button>
        </form>
      </div>
     
    </div>
  )
}
