
import { NavLink, useNavigate} from "react-router-dom";
import logo from "../../../../assets/imags/sidebarlogo.png"

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useContext, useState } from "react";
import { UserToken } from "../../../../Context/UserAuth.context";
import { jwtDecode } from "jwt-decode";
import { UserAuthTokenPayload } from "../../../../interfaces/interfaces";

export default function MySidebar() {

const [isCollapse , setIsCollapse] = useState(false)
const navigate = useNavigate()


// Auth Context 
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const { setUserAuth ,userAuth} = userContext;


function checkLogedRole(){
  if(!userAuth) return;
  const userDecoded :UserAuthTokenPayload = jwtDecode(userAuth)
  return userDecoded.roles[0]
}

const isUser = checkLogedRole() === "User";




function handleToggleCollapse(){
  setIsCollapse(!isCollapse)
}

  return (
    <div className="side-bar-container h-100 overflow-hidden">
<Sidebar  collapsed={isCollapse} className="h-100">
  <Menu className=" h-100 fw-bold py-3"  >
    

    
      <MenuItem active className="mb-4" onClick={handleToggleCollapse} component={<NavLink  to={"/dashboard"}/>}> <img className="w-75" src={logo} alt="logo-food" /> </MenuItem>
      <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<NavLink  to="/dashboard" />}> Home </MenuItem>
      <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<NavLink  to="users" />}> Users </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<NavLink  to="recipes"/>}> Recipes </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-table-list"></i>} component={<NavLink to="categories"/>}> Categories </MenuItem>

{isUser && <MenuItem icon={<i className="fa-solid fa-star"></i>} component={<NavLink  to="favs"/>}> Favourites </MenuItem>
}


    <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<NavLink to="change-pass"/>}> Change Password </MenuItem>
    <MenuItem onClick={()=>{
     setUserAuth(null)
     localStorage.removeItem("userToken")
     navigate("/login")
    }} icon={<i className="fa-solid fa-right-from-bracket"></i>}> LogOut </MenuItem>
  </Menu>
</Sidebar>;
    </div>
    
  )
}





