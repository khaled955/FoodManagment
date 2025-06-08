
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { UserToken } from "../../../../Context/UserAuth.context";
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";








// types of form Data 
type formData = {
 
  email?: string,
  password?: string,
  name?:string

  
}



export default function Login() {
const [showPassword , setShowPassword] = useState(false)
const [errorMessage , setErrorMessage] = useState<null | string>(null)
const navigate = useNavigate()


// Auth Context 
const userContext = useContext(UserToken);

  if (!userContext) {
    throw new Error("ProtectedRoute must be used within a UserAuthProvider");
  }

  const { setUserAuth} = userContext;







// useForm hook for form validation

  const {
    register,
    handleSubmit,
    control,
   
    formState: { errors,isSubmitting },
  } = useForm<formData>({mode:"onChange"})


 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:AUTHENTICATIONS_URLS.LOGIN,
      method:"POST",
      data:userInfo,
    }
    const {data} = await axios.request(options)
      setUserAuth(data.token)
localStorage.setItem("userToken",data.token)
      toast.success("Login successfully.")
            setErrorMessage(null)

        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
     



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
   <main className={`${styles["register-box"]} col-md-5 vh-100`} role="main" aria-labelledby="login-title">
  <section className="p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden">
    
    {/* Logo */}
    <div className="register-logo d-flex justify-content-center mb-3">
      <img className="w-75" src={logo} alt="Food Recipes logo" />
    </div>

    {/* Title */}
    <h1 id="login-title" className="h4">Log In</h1>
    <p className="fs-6 login-text">Welcome back! Please enter your details.</p>

    {/* Form */}
    <form
      onSubmit={handleSubmit(handleRegisterUser)}
      aria-describedby="login-form-description"
    >
      <p id="login-form-description" className="visually-hidden">
        Login form for registered users. Requires a valid email and secure password.
      </p>

      <fieldset className="form-box border-0">
        <legend className="visually-hidden">Login Credentials</legend>

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
                message: "Email must be valid"
              }
            })}
          />
          {errors.email && (
            <p className="text-danger error-message position-absolute start-0 top-100">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-100 position-relative mb-3">
          <label htmlFor="password" className="visually-hidden">Password</label>
          <div className="d-flex gap-1 align-items-center position-relative w-100">
            <div className="register-icons d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
            </div>
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
              title={!showPassword ? "Show password" : "Hide password"}
              role="button"
              tabIndex={0}
              aria-label={!showPassword ? "Show password" : "Hide password"}
            ></i>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-control rounded-0"
              placeholder="Password"
              aria-required="true"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message: "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
                }
              })}
            />
          </div>
          {errors.password && (
            <p className="auth-error-message">{errors.password.message}</p>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="navigate-links d-flex justify-content-between mb-3" aria-label="Login options">
          <Link className="text-black" to="/register">Register Now</Link>
          <Link className="text-danger" to="/forget-password">Forget Password?</Link>
        </nav>
      </fieldset>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-center text-danger fw-bold" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button
        className="auth-btn register-btn"
        type="submit"
        aria-label="Submit login form"
        disabled={isSubmitting}
      >
        {isSubmitting ?<i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
      </button>
    </form>

    {/* React Hook Form DevTool (dev only) */}
    <DevTool control={control} />
  </section>
</main>

  )
}
