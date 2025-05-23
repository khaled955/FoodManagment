
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./VerifyEmail.module.css"








// types of form Data 
type formData = {
 
  email: string,
  code: string,

  
}



export default function VerifyEmail() {
const [errorMessage , setErrorMessage] = useState<null | string>(null)
const navigate = useNavigate()



// useForm hook for form validation

  const {
    register,
    handleSubmit,
    control,
   
    formState: { errors },
  } = useForm<formData>({mode:"onChange"})


 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:"https://upskilling-egypt.com:3006/api/v1/Users/verify",
      method:"PUT",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    console.log(data)
    if(data.message === "Account verified successfully"){
      toast.success(data.message)
            setErrorMessage(null)
        setTimeout(()=>{
          navigate("/login")
        },3000)
     

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










// JSX Start
  return (
    <>
   <div className={` ${styles["register-box"]} col-md-5`}>
     <div className=" p-4 mt-4 bg-white rounded-2 shadow-lg">
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-75" src={logo} alt="logo food-recipies" />
     </div>

        <h2 className=""> Verify Account</h2>
        <p className="auth-p-text">Please Enter Your Otp  or Check Your Inbox</p>
        <form className="" onSubmit={handleSubmit(handleRegisterUser)}>
       <div className=" form-box">
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


 {/* OTP */}

<div className="w-100 position-relative">
  <div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i  className="fa-solid fa-lock"></i>
  </div>      
   <input className="form-control rounded-0" type="text" placeholder=" Enter Your OTP"
   {...register("code",{required:"OTP Is Required",pattern:{
    value:/^[a-zA-z0-9]{4}$/,
    message:"Otp Must Be 4 Charachter"
   }})}
   />


</div>
         {errors.code && <p className="auth-error-message position-absolute start-0 top-100 z-3"> {errors.code.message}</p>}

</div>

















 </div>



       </div>
   {errorMessage && <p className="text-center text-danger fw-bold">{errorMessage}</p>}
   <button className="auth-btn mt-4" type="submit"> Send</button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>
  )
}
