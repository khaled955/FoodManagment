
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css"









// types of form Data 
type formData = {
  seed: string,
  email: string,
  password: string,
  confirmPassword:string,
 
  
}



export default function ResetPassword() {
const [showPassword , setShowPassword] = useState(false)
const [showConfirmedPassword , setShowConfirmedPassword] = useState(false)
const [errorMessage , setErrorMessage] = useState<null | string>(null)
const navigate = useNavigate()



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
      url:"https://upskilling-egypt.com:3006/api/v1/Users/Reset",
      method:"POST",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    if(data.message === "Password has been updated successfully"){
      toast.success(data.message)
            setErrorMessage(null)
        setTimeout(()=>{
          navigate("/login")
        },3000)
     

    }


  } catch (error) {
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

const password = watch("password")







// JSX Start
  return (
    <>
   <div className={` ${styles["register-box"]} col-md-6`}>
     <div className={`p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden ${styles["register-parent"]}`}>
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-75" src={logo} alt="logo food-recipies" />
     </div>

        <h2 className=""> Reset Password</h2>
        <p className="auth-p-text">Please Enter Your Otp  or Check Your Inbox</p>
        <form className="" onSubmit={handleSubmit(handleRegisterUser)}>
       <div className=" d-flex flex-wrap gap-3 form-box">
           <div className="left-forms d-flex flex-column gap-4 flex-grow-1">
         



{/* Email */}

<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i className="fa-solid fa-envelope"></i> 

 </div>             
   <input className="form-control rounded-0" type="email" placeholder="Email"
   {...register("email",{required:"Email Is Required",pattern:{
    value:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    message:"Email Must Be Valid"
   }})}
   
   />
         {errors.email && <p className="auth-error-message position-absolute start-0 top-100">{errors.email.message}</p>}

</div>


{/*  OTP */}


      
<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
       <i className="fa-solid fa-user fs-4"></i>
  </div>             
   <input  className=" form-control rounded-0" type="text" placeholder="Enter Your OTP"
   {...register("seed",{required:"User Name Is Required",pattern:{
    value:/^[a-zA-Z0-9]{4}$/,
    message:"OTP Must Be 4 Charachters"
   }})}
   
   />
      {errors.seed && <p className="auth-error-message position-absolute start-0 top-100">{errors.seed.message}</p>}

</div>







 {/* password */}

<div className="w-100 position-relative">
  <div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i  className="fa-solid fa-lock"></i>
  </div>      
  <i onClick={()=>{
  setShowPassword(!showPassword)
}} className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showPassword ?"showPassword":"Hide Password"}></i>       
   <input className="form-control rounded-0" type={!showPassword ?"password":"text"} placeholder=" New Password"
   {...register("password",{required:"Password Is Required",pattern:{
    value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    message:`Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character

`,
   }})}
   autoComplete="new-password"
   />


</div>
         {errors.password && <p className="auth-error-message "> {errors.password.message}</p>}

</div>



{/* Confirmed  New password */}
<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i className="fa-solid fa-lock"></i>
  </div>   
    <i onClick={()=>{
      setShowConfirmedPassword(!showConfirmedPassword)
}} className={`fa-solid ${showConfirmedPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showConfirmedPassword ?"showPassword":"Hide Password"}></i>       
          
   <input className="form-control rounded-0" type={!showConfirmedPassword ?"password":"text"} placeholder="Confirm New Password"
   {...register("confirmPassword",{required:"Confirmed Password Is Required",validate:(value)=> value === password || "Passwords Do Not Match"})}
   onPaste={(e)=>{e.preventDefault()
    return false;
   }}
   autoComplete="new-password"
   />
         {errors.confirmPassword && <p className="auth-error-message position-absolute start-0 top-100">{errors.confirmPassword.message}</p>}

</div>













 </div>







       </div>
   {errorMessage && <p className="text-center text-danger fw-bold">{errorMessage}</p>}
   <button className="auth-btn mt-4" type="submit"> Reset Password</button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>
  )
}
