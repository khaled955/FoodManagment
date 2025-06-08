import { useContext } from "react";
import photo from "../../../../assets/imags/nodata.png"
import { AdminActions } from "../../../../Context/AdminActions.context";
import { DeletConfirmationModalProps } from "../../../../interfaces/interfaces";
import { RECIPES_URLS } from "../../../../Api/Url";



const delet_URL = "/api/v1/Category/"

export default function DeletConfirmationModal({onClick,handleDeleteRecipesByAdmin,currentId,handleHideDeletModal,actionDeletType,type,deleteLoading}:DeletConfirmationModalProps) {

const {handleDeleteDataByAdmin,isLoading} = useContext(AdminActions)!;



  return (
  <div
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
        onClick={onClick}
      >
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>

      {/* Image */}
      <figure className="text-center mb-3">
        <img className="w-75" src={photo} alt="Illustration for no data" />
        <figcaption className="visually-hidden">Confirmation illustration</figcaption>
      </figure>

      {/* Dialog Header */}
      <header>
        <h2 id="delete-dialog-title" className="h5 text-center">
          Delete This {type}
        </h2>
      </header>

      {/* Dialog Description */}
      <p id="delete-dialog-description" className="text-center text-muted">
        Are you sure you want to delete this item? If you are sure, just click the button below to confirm.
      </p>

      {/* Delete Button */}
      <footer className="text-end mt-4">
        <button disabled={isLoading || deleteLoading}

          className="btn btn-danger default-btn"
          onClick={() => {
            if (actionDeletType === "category")
              handleDeleteDataByAdmin?.(delet_URL, "Category Deleted Successfully", currentId);

            if (actionDeletType === "recipes")
              handleDeleteRecipesByAdmin?.(RECIPES_URLS.DELETE_RECIPES_BY_ID(currentId), "Recipe Deleted Successfully");

            setTimeout(() => {
              handleHideDeletModal();
            }, 1000);
          }}
          aria-label="Confirm delete item"
        >
          {isLoading || deleteLoading? <i className="fa-solid fa-spinner fa-spin"></i>:"Delete This Item"}
        </button>
      </footer>
    </section>
  </div>
);

}

