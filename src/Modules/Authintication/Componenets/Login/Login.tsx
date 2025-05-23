
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { UserToken } from "../../../../Context/UserAuth.context";








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
   
    formState: { errors },
  } = useForm<formData>({mode:"onChange"})


 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:"https://upskilling-egypt.com:3006/api/v1/Users/Login",
      method:"POST",
      data:userInfo,
    }
    const {data} = await axios.request(options)
      setUserAuth(data.token)
localStorage.setItem("userToken",data.token)
      toast.success("Login successfully.")
            setErrorMessage(null)
          navigate("/dashboard")

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
    <>
   <div className={` ${styles["register-box"]}  col-md-5 vh-100`}>
     <div className=" p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden">
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-75" src={logo} alt="logo food-recipies" />
     </div>

        <h2 className="h4"> Log In</h2>
        <p className=" text-capitalize fs-6 login-text">Welcome Back! Please enter your details</p>
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
         {errors.email && <p className="text-danger error-message position-absolute start-0 top-100">{errors.email.message}</p>}

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
   <input className="form-control rounded-0" type={!showPassword ?"password":"text"} placeholder="Password"
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


<div className="navigate-links d-flex justify-content-between mb-2">
   <Link className="text-black" to={"/register"}>Register Now</Link>
  <Link className="text-danger" to={"/forget-password"}>Forget Password ?</Link>
  {/* <Link to={"/verifyemail"}>Verify Your Acount </Link> */}
</div>














 </div>



       </div>
   {errorMessage && <p className="text-center text-danger fw-bold">{errorMessage}</p>}
   <button className="auth-btn register-btn" type="submit"> Login</button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>
  )
}
