/* eslint-disable @typescript-eslint/no-explicit-any */
import  dashboardimg from "../../../../assets/imags/otherheaderphotosection.png"
import Header from "../../../Shared/Components/Header/Header"
import axiosInstance from "../../../../Api/AxiosInstance"
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url"
import { useCallback, useEffect, useMemo, useState } from "react"
import { User } from "../../../../interfaces/interfaces"
import Loading from "../../../Shared/Components/Loading/Loading"
import NoData from "../../../Shared/Components/NoData/NoData"
import { Dropdown } from "react-bootstrap"
import { BsEye, BsThreeDotsVertical, BsTrash } from "react-icons/bs"
import { Helmet } from 'react-helmet-async';
import UserProfileCard from "../UserProfileCard/UserProfileCard"
import UserDeleteModale from "../UserDeleteModal/UserDeleteModale"
import toast from "react-hot-toast"
import { isAxiosError } from "axios"
import { debounce } from "lodash"
import Pagination from "../../../Shared/Components/Pagination/Pagination"
import { useNavigate } from "react-router-dom"
import useRole from "../../../../Hooks/useRole"

const dashboardHeaderOne = "Users"
const dashboardHeaderTwo = "List"
const dashBoardText = "You can now add your items that any user can order it from the Application and you can edit"


export default function UsersList() {
const [usersList , setUsersList] = useState<User[] | null>(null)
const [isSorted , setIsSorted] = useState(false)
const [userProfile , setUserProfile] = useState<User | null>(null)
const [showUserProfile , setShowUserProfile] = useState(false)
const [showDeletModal , setShowDeletModal] = useState(false)
const [searchQuery , setSearchQuery] = useState("")
const [searchqueryRole,setSearchQueryRole] = useState("")
const [currentPage , setCurrentPage] = useState(1)
const [totalNumberOfPages , setTotalNumberOfPages] = useState(1)
const navigate = useNavigate()
const isAdmine = useRole()



const getAllUsers = useCallback(async(url:string)=>{

if(!isAdmine) return ;

  try {
    const {data} =  await axiosInstance.get(url)
    setUsersList(data.data)
   setTotalNumberOfPages(data.totalNumberOfPages)

  } catch (error) {
     console.log(error)
  }




},[isAdmine])


useEffect(()=>{
  getAllUsers(AUTHENTICATIONS_URLS.GET_LOGED_USER(15,currentPage,searchQuery,searchqueryRole))
},[currentPage,searchQuery,searchqueryRole,getAllUsers])



//  start logic handle search by Name input
function handleSearchByName(e:React.ChangeEvent<HTMLInputElement>){
  
const query = e.target.value
setSearchQuery(query)
setCurrentPage(1)
debounceSearchByName(e.target.value)

}

// debounce function for search by name 

const debounceSearchByName = useMemo(()=>{

return debounce((query:string)=>{
getAllUsers(AUTHENTICATIONS_URLS.GET_LOGED_USER(15,currentPage,query,searchqueryRole))
},300)


},[currentPage,searchqueryRole,getAllUsers])


// clean up debounce function 


useEffect(()=>{
  return ()=>{
    debounceSearchByName.cancel()
  }
},[debounceSearchByName])



// End logic of search by name inpute


// handle search by user role

function handleFilterByRole(e:React.ChangeEvent<HTMLSelectElement>){
const query = e.target.value
setSearchQueryRole(query)
getAllUsers(AUTHENTICATIONS_URLS.GET_LOGED_USER(15,currentPage,searchQuery,query))



}













function handeSortByNames(){

  const usersSorted =usersList?.sort((a:User,b:User)=> a.userName.localeCompare(b.userName))
  setUsersList(usersSorted || [])
}
function handeReversetByNames(){

  const usersSorted =usersList?.sort((a:User,b:User)=> b.userName.localeCompare(a.userName))
  setUsersList(usersSorted || [])
}


function handleHideUserProfile(){
  setShowUserProfile(false)
}

function handleShowUserProfile(){
  setShowUserProfile(true)
}


function handleHideUserDeletModal(){
  setShowDeletModal(false)
}

function handleShowUserDeletModal(){
  setShowDeletModal(true)
}





function handleSetUserProfileData(userInfo:User){
setUserProfile(userInfo)
}


// Delet Specific user
 async function handleDeleteUserByAdmin(id:number):Promise<any>{

  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:AUTHENTICATIONS_URLS.DELET_USER_BY_ID(id),
        method:"DELETE",
        
        
    }

    const {data} = await axiosInstance.request(options)
    if(data.message === "The user has been deleted successfully"){
 toast.success(data.message)
     await getAllUsers(AUTHENTICATIONS_URLS.GET_LOGED_USER(15,currentPage))
    }
   
    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
    }







}



// handle Deeplinking

useEffect(() => {
  if (!isAdmine) {

    navigate("/dashboard");
    return 
  }
}, [isAdmine, navigate]);









if(!usersList) return <Loading/>


  return (
   <>
  <Helmet>
      <title>Users | Food Management</title>
      <meta name="description" content="View, add, and manage delicious recipes with pricing and categories." />
      <meta name="keywords" content="users, food items, cooking, meal management" />
      <meta property="og:title" content="Users Management | Food Dashboard" />
      <meta property="og:description" content="Organize and explore all Users with easy controls and detailed views." />
      <meta property="og:type" content="website" />
    </Helmet>



<Header imgePath={dashboardimg} titleOne={dashboardHeaderOne} titleTwo={dashboardHeaderTwo} text ={dashBoardText}/>

{showUserProfile && <UserProfileCard userProfile = {userProfile} handleHideUserProfile={handleHideUserProfile}/>}
{showDeletModal && <UserDeleteModale userProfile = {userProfile}  handleHideUserDeletModal={handleHideUserDeletModal} handleDeletUser={handleDeleteUserByAdmin}/>}
<div className="my-4">
   <h3 className="h5">Users Table Details</h3>
 <p className="fs-6 text-danger">You can check all details</p>
</div>
   



{/*  Search box */}

<div className="search-box d-flex gap-1 mb-3">
  <input onChange={(e)=>{handleSearchByName(e)}} value={searchQuery} className="flex-grow-1" type="text"  placeholder="Search By Name ...."/>

  <select  value={searchqueryRole} onChange={(e)=>{handleFilterByRole(e)}}>
    <option disabled value="">Filter By Role</option>
    <option value="">All Users</option>
    <option value="1">Admine</option>
    <option value="2">User</option>
  </select>



</div>










<table className="table table-responsive text-center">
    <caption id="category-table-heading" className="visually-hidden">
      Users table listing names, creation dates, and available actions.
    </caption>
    <thead>
      <tr>
        <th
          className="d-flex align-items-center justify-content-center gap-1"
          scope="col"
          aria-sort={isSorted ? "ascending" : "descending"}
        >
          Name{" "}
          {isSorted ? (
            <i
              onClick={() => {
                setIsSorted(false);
                handeReversetByNames()
                
              }}
              className="fa-solid fa-caret-up"
              role="button"
              aria-label="Sort descending"
              tabIndex={0}
            ></i>
          ) : (
            <i
              onClick={() => {
                setIsSorted(true);
                handeSortByNames()
              }}
              className="fa-solid fa-caret-down"
              role="button"
              aria-label="Sort ascending"
              tabIndex={0}
            ></i>
          )}
        </th>
        <th scope="col">Country</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>

      {usersList.length > 0 ? (
        usersList.map((user: User) => (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>
              {user.country}
            </td>
            <td className="recipe-table-name">
              {user.email}
            </td>
            <td>
              {user.phoneNumber}
            </td>
            <td>
              <Dropdown>
      <Dropdown.Toggle
        as="button"
        className="btn btn-link p-0 border-0"
        id="dropdown-custom-button"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm rounded-3">
        <Dropdown.Item  onClick={()=>{
          handleSetUserProfileData(user)
          handleShowUserProfile()
        }}>
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

      

        <Dropdown.Item  onClick={()=>{
          handleSetUserProfileData(user)
          handleShowUserDeletModal()
        }}>
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
               </Dropdown>
              
              
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>
            <div aria-live="polite">
              <NoData />
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>



<Pagination currentPage={currentPage} totalPages={totalNumberOfPages} onPageChange={setCurrentPage}/>

   </>
  )
}
