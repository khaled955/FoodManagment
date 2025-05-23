import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MySidebar from "../Sidebar/MySidebar";




export default function MasterLayout() {







  return<>
         <Navbar/>
<div className="container-fluid min-vh-100 d-flex p-0">

<div className="side-bar">
  <MySidebar/>
</div>

  <div className="py-5 w-100 px-4">
        <Outlet></Outlet>
  </div>




</div>
</>


}


