
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css"








// types of form Data 
type formData = {
 
  email: string,


  
}



export default function ForgetPassword() {
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
      url:"https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
      method:"POST",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    console.log(data)
    if(data.message === "Your request is being processed, please check your email"){
      toast.success(data.message)
            setErrorMessage(null)
        setTimeout(()=>{
          navigate("/reset-password")
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










// JSX Start
  return (
    <>
   <div className={` ${styles["register-box"]} col-md-7`}>
     <div className=" p-4 mt-4 bg-white rounded-2 shadow-lg w-md-75 overflow-hidden">
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-75" src={logo} alt="logo food-recipies" />
     </div>

        <h2 className=" text-center"> Forget Your Password </h2>
        <p className="auth-p-text">No worries! Please enter your email and we will send a password reset link </p>
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



















 </div>



       </div>
   {errorMessage && <p className="text-center text-danger mt-4 fw-bold">{errorMessage}</p>}
   <button className="auth-btn mt-4" type="submit"> Send</button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>
  )
}
