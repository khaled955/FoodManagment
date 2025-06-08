import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MySidebar from "../Sidebar/MySidebar";
import { useState } from "react";




export default function MasterLayout() {
const [isCollapse , setIsCollapse] = useState(false)



function handleToggleCollapse(){
  setIsCollapse(!isCollapse)
}



  return<>
         
<div className="container-fluid min-vh-100 d-flex p-0">

<div className="side-bar">
  <MySidebar handleToggleCollapse={handleToggleCollapse} isCollapse={isCollapse}/>
</div>

  <div className={`${isCollapse?"w-100 ms-5":"outlet-collapse"} p-5`}>
    <Navbar/>
        <Outlet></Outlet>
  </div>




</div>
</>


}


