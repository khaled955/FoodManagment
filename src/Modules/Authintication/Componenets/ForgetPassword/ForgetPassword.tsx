
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css"
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";








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
    watch,
   
    formState: { errors,isSubmitting },
  } = useForm<formData>({mode:"onChange"})





 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:AUTHENTICATIONS_URLS.FORGET_PASSWORD,
      method:"POST",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    if(data.message === "Your request is being processed, please check your email"){
      toast.success(data.message)
            setErrorMessage(null)
        setTimeout(()=>{
          navigate("/reset-password",{state:{email:watch("email")}})
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
    <main className={`${styles["register-box"]} col-md-7`} role="main" aria-labelledby="forgot-password-title">
  <section className="p-4 mt-4 bg-white rounded-2 shadow-lg w-md-75 overflow-hidden">
    {/* Logo */}
    <div className="register-logo d-flex justify-content-center mb-3">
      <img className="w-75" src={logo} alt="Food Recipes logo" />
    </div>

    {/* Title and Description */}
    <h1 id="forgot-password-title" className="text-center h4">Forget Your Password</h1>
    <p className="auth-p-text text-center">
      No worries! Please enter your email and we will send a password reset link.
    </p>

    {/* Form */}
    <form
      onSubmit={handleSubmit(handleRegisterUser)}
      aria-describedby="forgot-form-desc"
    >
      <p id="forgot-form-desc" className="visually-hidden">
        Form to reset your password by entering your email.
      </p>

      <fieldset className="form-box border-0">
        <legend className="visually-hidden">Reset Password Email</legend>

        {/* Email Input */}
        <div className="d-flex gap-1 align-items-center position-relative w-100 mb-3">
          <label
            htmlFor="email"
            className="register-icons d-flex justify-content-center align-items-center"
          >
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          </label>

          <input
            id="email"
            type="email"
            className="form-control rounded-0"
            placeholder="Email"
            aria-required="true"
            aria-describedby="emailHelp"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Email must be valid"
              }
            })}
          />

          {errors.email && (
            <p id="emailHelp" className="auth-error-message position-absolute start-0 top-100" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Server Error */}
      {errorMessage && (
        <p className="text-center text-danger mt-4 fw-bold" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button
        className="auth-btn mt-4"
        type="submit"
        aria-label="Send password reset link to email"
        disabled={isSubmitting}
      >
        {isSubmitting? <i className="fa-solid fa-spinner fa-spin"></i>:"Send"}
      </button>
    </form>

    {/* Dev Tool (development only) */}
    <DevTool control={control} />
  </section>
</main>

  )
}
