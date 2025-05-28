
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./VerifyEmail.module.css"
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";








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
      url:AUTHENTICATIONS_URLS.VERIFY_USER_ACCOUNT,
      method:"PUT",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    if(data.message === "Account verified successfully"){
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










// JSX Start
  return (
    <main className={`${styles["register-box"]} col-md-5`} role="main" aria-labelledby="verify-account-title">
  <section className="p-4 mt-4 bg-white rounded-2 shadow-lg" aria-describedby="verify-instructions">
    
    {/* Logo */}
    <div className="register-logo d-flex justify-content-center mb-3">
      <img className="w-75" src={logo} alt="Food Recipes logo" />
    </div>

    {/* Title */}
    <h1 id="verify-account-title" className="text-center h4">Verify Account</h1>
    <p id="verify-instructions" className="auth-p-text text-center">
      Please enter your OTP or check your inbox.
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit(handleRegisterUser)} aria-label="Verification form for account confirmation">
      <fieldset className="form-box border-0">
        <legend className="visually-hidden">Account Verification</legend>

        {/* Email */}
        <div className="d-flex gap-1 align-items-center position-relative w-100 mb-3">
          <label htmlFor="email" className="register-icons d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          </label>
          <input
            id="email"
            className="form-control rounded-0"
            type="email"
            placeholder="Email"
            aria-required="true"
            {...register("email", {
              required: "Email Is Required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Email must be valid"
              }
            })}
          />
          {errors.email && (
            <p className="auth-error-message position-absolute start-0 top-100" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* OTP */}
        <div className="w-100 position-relative mb-3">
          <label htmlFor="code" className="visually-hidden">OTP</label>
          <div className="d-flex gap-1 align-items-center position-relative w-100">
            <div className="register-icons d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
            </div>
            <input
              id="code"
              className="form-control rounded-0"
              type="text"
              placeholder="Enter Your OTP"
              aria-required="true"
              {...register("code", {
                required: "OTP is required",
                pattern: {
                  value: /^[a-zA-Z0-9]{4}$/,
                  message: "OTP must be 4 characters"
                }
              })}
            />
          </div>
          {errors.code && (
            <p className="auth-error-message position-absolute start-0 top-100 z-3" role="alert">
              {errors.code.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Server-side Error */}
      {errorMessage && (
        <p className="text-center text-danger fw-bold" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button className="auth-btn mt-4" type="submit" aria-label="Submit verification form">
        Send
      </button>
    </form>

    {/* DevTool (optional for debugging) */}
    <DevTool control={control} />
  </section>
</main>

  )
}
