import { useContext } from "react";
import photo from "../../../../assets/imags/nodata.png"
import { AdminActions } from "../../../../Context/AdminActions.context";



const delet_URL = "/api/v1/Category/"

export default function DeletConfirmationModal({onClick,currentId,handleHideDeletModal,actionDeletType}:{onClick:()=>void,currentId:number,handleHideDeletModal:()=>void,actionDeletType:string}) {
const {handleDeleteDataByAdmin} = useContext(AdminActions)!;






  return (


      <div className=" position-fixed top-0 start-0 end-0 bottom-0 add-update-box row justify-content-center align-items-center  ">
         <div className="bg-white col-10 col-md-5 rounded-2 p-2 overflow-hidden position-relative">

         <div className="btn-close-btn-update-add-form position-absolute end-0 top-0 p-2 bg-black text-white fw-bold d-flex justify-content-center align-items-center">
             <i onClick={()=>{

               onClick()
             }} className="fa-solid fa-xmark"></i>
            </div>


      <div className="img-box-no-data text-center mb-2">
        <img className="w-75" src={photo} alt="girl img for no data" />
      </div>
      <div className="description-box">
        <h4 className="h5 text-center">Delete This Category ?</h4>
        <p className="description-box p">are you sure you want to delete this item ? if you are sure just click on delete it</p>

        <div className="delet-btn">
        <button onClick={()=>{

       if(actionDeletType === "category") handleDeleteDataByAdmin(delet_URL , "Category Deleted Successfully", currentId);

         setTimeout(()=>{
          handleHideDeletModal()
         },2000)

        }} className="btn btn-danger ms-auto d-block">Delete This Item</button>
        </div>
      </div>
    </div>
      </div>
  )
}

