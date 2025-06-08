
import { User } from "../../../../interfaces/interfaces";

export default function UserProfileCard({userProfile,handleHideUserProfile}:{userProfile:User | null,handleHideUserProfile:()=>void}) {
  return (

  <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-start bg-dark bg-opacity-50 z-3">
      <div className="card shadow-lg mt-5 col-md-6 rounded-4 border-0">
        <div className="card-body position-relative p-4 bg-light">
          <button
            onClick={handleHideUserProfile}
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          ></button>
              <h2 className="text-center">  <i className="fa-solid fa-user-tie text-success"></i>User-Information</h2>

          <div className="d-flex align-items-center border-bottom pb-3 mb-4">
          
            <div>
              <h5 className="mb-1 fw-bold">{userProfile?.userName}</h5>
              <p className="mb-1 text-muted">
                <i className="fa-solid fa-envelope me-2 text-primary"></i>
                {userProfile?.email}
              </p>
              <p className="mb-0 text-muted">
                <i className="fa-solid fa-phone me-2 text-success"></i>
                {userProfile?.phoneNumber}
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-sm-6">
              <div className="text-muted fw-semibold mb-1">
                <i className="fa-solid fa-earth-asia me-2 text-info"></i>
                Country
              </div>
              <div>{userProfile?.country}</div>
            </div>

            <div className="col-sm-6">
              <div className="text-muted fw-semibold mb-1">
                <i className="fa-solid fa-user-shield me-2 text-warning"></i>
                Role
              </div>
              <div>{userProfile?.group.name}</div>
            </div>

            <div className="col-sm-6">
              <div className="text-muted fw-semibold mb-1">
                <i className="fa-regular fa-calendar-plus me-2 text-secondary"></i>
                Created At
              </div>
              <div>{new Date(userProfile?.creationDate || "").toLocaleDateString()}</div>
            </div>

            <div className="col-sm-6">
              <div className="text-muted fw-semibold mb-1">
                <i className="fa-regular fa-clock me-2 text-secondary"></i>
                Last Modified
              </div>
              <div>{new Date(userProfile?.modificationDate || "").toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}
