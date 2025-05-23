import { Link } from "react-router-dom"
import photo from "../../../../assets/imags/logo.png"
import notfound from "../../../../assets/imags/notfound404.png"
export default function NotFound() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="text-side col-md-3">
        <div className="img-logo mb-5">
          <img src={photo} alt="logo-img" />
        </div>
        <h3>Oops.... </h3>
        <p className="text-info mb-4">Page  not found </p>
        <p className="text-danger">This Page doesn’t exist or was removed!
We suggest you  back to home.</p>

<Link className="btn btn-danger" to="/dashboard"> <i className="fa-solid fa-left-long me-2"></i> Back To Home</Link>
      </div>
      <div className="right-side-not-found col-md-9 d-flex justify-content-center align-items-end">
         <img className="w-75" src={notfound} alt="not-found" />
      </div>
      </div>
    </div>
  )
}
