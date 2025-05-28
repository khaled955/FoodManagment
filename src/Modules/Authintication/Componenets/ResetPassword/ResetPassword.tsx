
import { useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css"
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";









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
      url:AUTHENTICATIONS_URLS.RESET_PASSWORD,
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

<main className={`${styles["register-box"]} col-md-6`} role="main" aria-labelledby="reset-password-title">
  <section className={`p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden ${styles["register-parent"]}`}>
    
    {/* Logo */}
    <div className="register-logo d-flex justify-content-center mb-3">
      <img className="w-75" src={logo} alt="Food Recipes logo" />
    </div>

    {/* Title */}
    <h1 id="reset-password-title" className="text-center h4">Reset Password</h1>
    <p className="auth-p-text text-center">Please enter your OTP or check your inbox.</p>

    {/* Form */}
    <form onSubmit={handleSubmit(handleRegisterUser)} aria-describedby="reset-password-desc">
      <p id="reset-password-desc" className="visually-hidden">
        Form to reset your password. Requires email, OTP, and matching new passwords.
      </p>

      <fieldset className="form-box border-0">
        <legend className="visually-hidden">Reset Password Form</legend>

        {/* Email */}
        <div className="d-flex gap-1 align-items-center position-relative w-100 mb-3">
          <label htmlFor="email" className="register-icons d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          </label>
          <input
            id="email"
            type="email"
            className="form-control rounded-0"
            placeholder="Email"
            aria-required="true"
            {...register("email", {
              required: "Email Is Required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Email Must Be Valid"
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
        <div className="d-flex gap-1 align-items-center position-relative w-100 mb-3">
          <label htmlFor="seed" className="register-icons d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-user fs-4" aria-hidden="true"></i>
          </label>
          <input
            id="seed"
            className="form-control rounded-0"
            type="text"
            placeholder="Enter Your OTP"
            aria-required="true"
            {...register("seed", {
              required: "OTP is required",
              pattern: {
                value: /^[a-zA-Z0-9]{4}$/,
                message: "OTP must be 4 characters"
              }
            })}
          />
          {errors.seed && (
            <p className="auth-error-message position-absolute start-0 top-100" role="alert">
              {errors.seed.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="w-100 position-relative mb-3">
          <label htmlFor="password" className="visually-hidden">New Password</label>
          <div className="d-flex gap-1 align-items-center position-relative w-100">
            <div className="register-icons d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
            </div>
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
              title={!showPassword ? "Show Password" : "Hide Password"}
              role="button"
              tabIndex={0}
              aria-label={!showPassword ? "Show password" : "Hide password"}
            ></i>
            <input
              id="password"
              className="form-control rounded-0"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              aria-required="true"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message: "Must contain 8+ chars, uppercase, lowercase, number, and special character"
                }
              })}
            />
          </div>
          {errors.password && (
            <p className="auth-error-message" role="alert">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="d-flex gap-1 align-items-center position-relative w-100 mb-3">
          <label htmlFor="confirmPassword" className="visually-hidden">Confirm New Password</label>
          <div className="register-icons d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-lock" aria-hidden="true"></i>
          </div>
          <i
            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
            className={`fa-solid ${showConfirmedPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
            title={!showConfirmedPassword ? "Show Password" : "Hide Password"}
            role="button"
            tabIndex={0}
            aria-label={!showConfirmedPassword ? "Show password" : "Hide password"}
          ></i>
          <input
            id="confirmPassword"
            className="form-control rounded-0"
            type={showConfirmedPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            aria-required="true"
            autoComplete="new-password"
            onPaste={(e) => e.preventDefault()}
            {...register("confirmPassword", {
              required: "Confirmed password is required",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className="auth-error-message position-absolute start-0 top-100" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Server-side Error */}
      {errorMessage && (
        <p className="text-center text-danger fw-bold mt-2" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button
        className="auth-btn mt-4"
        type="submit"
        aria-label="Submit password reset"
      >
        Reset Password
      </button>
    </form>

    {/* React Hook Form DevTool (Dev only) */}
    <DevTool control={control} />
  </section>
</main>


  )
}
