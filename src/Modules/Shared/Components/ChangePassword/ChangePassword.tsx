
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import styles from "./ChangePassword.module.css"



// types of form Data 
type formData = {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword:string,
 
  
}



export default function ChangePassword() {
const [showPassword , setShowPassword] = useState(false)
const [showConfirmedPassword , setShowConfirmedPassword] = useState(false)
const [errorMessage , setErrorMessage] = useState<null | string>(null)



// useForm hook for form validation

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formData>({mode:"onChange"})


 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:"https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
      method:"PUT",
      data:userInfo,
      headers:{
        Authorization:localStorage.getItem("userToken")
      }
    }

    const {data} = await axios.request(options)
    console.log(data)
    if(data.message === "Password has been updated successfully"){
      toast.success(data.message)
            setErrorMessage(null)
       

    }


  } catch (error) {
    console.log(error)
if(isAxiosError(error)){
  setErrorMessage(error.response?.data.message)
  toast.error(error.response?.data.message)
}else{
  setErrorMessage("Error")
}

  }finally{
    toast.dismiss(toastId)

  }





}





// check password Event handler

const newPassword = watch("newPassword")
const oldPassword = watch("oldPassword")






// JSX Start
  return (
    <>
   <div className={` ${styles["register-box"]} d-flex justify-content-center align-items-center`}>
     <div className={`p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden ${styles["register-parent"]}`}>
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-75"  src={logo} alt="logo food-recipies" />
     </div>

        <h2 className=" text-center"> Change Your Password</h2>
        <p className="mb-4 text-danger text-center">Please Enter Details Below</p>
        <form className="" onSubmit={handleSubmit(handleRegisterUser)}>
       <div className=" form-box">
           <div className="left-forms  flex-grow-1">

 {/*  old password */}

<div className="w-100 position-relative">
  <div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i  className="fa-solid fa-lock"></i>
  </div>      
  <i onClick={()=>{
  setShowPassword(!showPassword)
}} className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showPassword ?"showPassword":"Hide Password"}></i>       
   <input className="form-control rounded-0" type={!showPassword ?"password":"text"} placeholder=" Old Password"
   {...register("oldPassword",{required:"Old Password Is Required",pattern:{
    value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    message:`Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character

`,
   }})}
   autoComplete="new-password"
   />


</div>

</div>
         {errors.oldPassword && <p className="text-danger error-message "> {errors.oldPassword.message}</p>}

{/*  New Password  */}

<div className="w-100 position-relative">
  <div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i  className="fa-solid fa-lock"></i>
  </div>      
  <i onClick={()=>{
  setShowPassword(!showPassword)
}} className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showPassword ?"showPassword":"Hide Password"}></i>       
   <input className="form-control rounded-0" type={!showPassword ?"password":"text"} placeholder=" New Password"
   {...register("newPassword",{required:"New Password Is Required",pattern:{
    value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    message:`Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character

`,
   },validate:(value)=> value !== oldPassword || "New Password Must Be different Than Old Password"})}
   autoComplete="new-password"
   />


</div>

</div>

         {errors.newPassword && <p className="text-danger error-message "> {errors.newPassword.message}</p>}







{/* Confirmed  New password */}
<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i className="fa-solid fa-lock"></i>
  </div>   
    <i onClick={()=>{
      setShowConfirmedPassword(!showConfirmedPassword)
}} className={`fa-solid ${showConfirmedPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showConfirmedPassword ?"showPassword":"Hide Password"}></i>       
          
   <input className="form-control rounded-0" type={!showConfirmedPassword ?"password":"text"} placeholder="Confirm New Password"
   {...register("confirmNewPassword",{required:"Confirmed Password Is Required",validate:(value)=> value === newPassword || "Passwords Do Not Match"})}
   onPaste={(e)=>{e.preventDefault()
    return false;
   }}
   autoComplete="new-password"
   />
         {errors.confirmNewPassword && <p className="text-danger error-message position-absolute start-0 top-100">{errors.confirmNewPassword.message}</p>}

</div>













 </div>







       </div>
   {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
   <button className="auth-btn register-btn" type="submit"> Change Password</button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>
  )
}
