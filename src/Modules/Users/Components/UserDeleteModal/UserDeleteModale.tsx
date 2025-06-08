/* eslint-disable @typescript-eslint/no-explicit-any */
import photo from "../../../../assets/imags/nodata.png"
import { User } from "../../../../interfaces/interfaces";




export default function UserDeleteModale({userProfile,handleHideUserDeletModal,handleDeletUser}:{userProfile:User | null,handleHideUserDeletModal:()=>void , handleDeletUser:(id:number)=>Promise<any>}) {




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
      >
        <i onClick={handleHideUserDeletModal} className="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>

      {/* Image */}
      <figure className="text-center mb-3">
        <img className="w-75" src={photo} alt="Illustration for no data" />
        <figcaption className="visually-hidden">Confirmation illustration</figcaption>
      </figure>

      {/* Dialog Header */}
      <header>
        <h2 id="delete-dialog-title" className="h5 text-center">
          Delete {userProfile?.userName}
        </h2>
      </header>

      {/* Dialog Description */}
      <p id="delete-dialog-description" className="text-center text-muted">
        Are you sure you want to delete this User? If you are sure, just click the button below to confirm.
      </p>

      {/* Delete Button */}
      <footer className="text-end mt-4">
        <button
          className="btn btn-danger"
       onClick={()=>{
        if(userProfile)  handleDeletUser(userProfile.id)
            setTimeout(() => {
                handleHideUserDeletModal()
            }, 2000);
       }}
          aria-label="Confirm delete item"
        >
          Delete
        </button>
      </footer>
    </section>
  </div>
);

}

