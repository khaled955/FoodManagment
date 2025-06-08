
import { NavLink, useNavigate} from "react-router-dom";
import logo from "../../../../assets/imags/sidebarlogo.png"

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import useRole from "../../../../Hooks/useRole";
import { useContext } from "react";
import { UserToken } from "../../../../Context/UserAuth.context";

export default function MySidebar({handleToggleCollapse,isCollapse}:{handleToggleCollapse:()=>void,isCollapse:boolean}) {

const navigate = useNavigate()
const isAdmin = useRole()
const {setUserAuth} = useContext(UserToken)!;




  return (

    

<div
  className="side-bar-container"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: isCollapse ? "80px" : "240px",
    zIndex: 1000,
  }}
>
  <Sidebar collapsed={isCollapse} className="h-100">
    <Menu className="h-100 fw-bold py-3">
      <MenuItem className="mb-4" onClick={handleToggleCollapse}>
        <img className="w-75" src={logo} alt="logo-food" />
      </MenuItem>
      <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<NavLink to="/dashboard" />}>
        Home
      </MenuItem>

      {isAdmin && <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<NavLink to="users" />}>
        Users
      </MenuItem>}

      <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<NavLink to="recipes" />}>
        Recipes
      </MenuItem>


     {isAdmin &&  <MenuItem icon={<i className="fa-solid fa-table-list"></i>} component={<NavLink to="categories" />}>
        Categories
      </MenuItem>}

      {!isAdmin && (
        <MenuItem icon={<i className="fa-solid fa-star"></i>} component={<NavLink to="favs" />}>
          Favourites
        </MenuItem>
      )}
      <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<NavLink to="change-password" />}>
        Change Password
      </MenuItem>
      <MenuItem
        onClick={() => {
          setUserAuth(null);
          localStorage.removeItem("userToken");
          navigate("/login");
        }}
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
      >
        LogOut
      </MenuItem>
    </Menu>
  </Sidebar>
</div>


  )
}






