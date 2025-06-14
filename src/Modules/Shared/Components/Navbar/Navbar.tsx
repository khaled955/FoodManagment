import { jwtDecode } from "jwt-decode";
import { UserAuthTokenPayload } from '../../../../interfaces/interfaces';
import { useContext } from 'react';
import { UserToken } from '../../../../Context/UserAuth.context';
import photo from "../../../../assets/imags/sidebarlogo.png"



export default function Navbar() {

// Auth Context 
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const { userAuth} = userContext;





function getUserDecoded(){
  if(!userAuth) return ""
  const decoded:UserAuthTokenPayload = jwtDecode(userAuth);
  return decoded.userName
}



  return (
    <nav className="px-0 px-sm-4 d-flex justify-content-between py-1 px-1 gap-3 position-fixed top-0 end-0 start-0 align-items-center my-nav">
      <div className="btn-show">
              <i className="fa-solid fa-bars fs-5 d-sm-none text-black"></i>

      </div>
      <div className="serach-input w-50 rounded-2 overflow-hidden ms-auto position-relative">
        <i className="fa-solid fa-magnifying-glass position-absolute top-50 text-black translate-middle-y"></i>
        <input disabled className='w-100 border-0 px-5' type="search" name="search" id="search" placeholder='Search here' />
      </div>
      <div className='d-flex gap-2 align-items-center nav-header'>
        <h2 className=' h6'>{getUserDecoded()}</h2>
        <div className="profile-setting d-flex justify-content-center align-items-center">
 <img className="w-25" src={photo} alt="" />
 <h3 className='h6 text-info'>UpSkilling</h3>
      </div>
      </div>
    </nav>
  )
}
