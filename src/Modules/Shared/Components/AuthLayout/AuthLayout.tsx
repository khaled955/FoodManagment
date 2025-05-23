import { Outlet } from "react-router-dom";
import styles from "./AuthLatout.module.css"
export default function AuthLayout() {
  return <>
  <div className={`${styles["auth-container"]}`}>
 <div className="container-fluid vh-100 bg-overLay">
<div className="row justify-content-center align-items-center">
  
     <Outlet/>
 
</div>
 </div>
  </div>
  
  </>
}
