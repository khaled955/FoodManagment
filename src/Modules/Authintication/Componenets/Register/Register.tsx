/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import styles from "./Register.module.css"
import { countries} from 'countries-list'
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png"
import { useNavigate } from "react-router-dom";
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";







// get countryList and phone
const countriesList = Object.values(countries).map(country=>{
  return {Countryname:country.name,countryPhone:country.phone[0]}
}).sort((a,b)=>a.Countryname.localeCompare(b.Countryname))



// types of form Data 
type formData = {
  userName: string,
  email: string,
  password: string,
  confirmPassword:string,
  country: string,
  phoneNumber:string,
  
}



export default function Register() {
const[phonePrefix , SetphonePrefix] = useState<string | number>("")
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
    formState: { errors ,isSubmitting},
  } = useForm<formData>({mode:"onTouched",defaultValues:{
    country:"",
  }})


 async function handleRegisterUser(userInfo:formData){
const toastId = toast.loading("Waiting....")

  try {
    const options = {
      url:AUTHENTICATIONS_URLS.SIGNUP,
      method:"POST",
      data:userInfo,
    }

    const {data} = await axios.request(options)
    if(data.message.includes("Account created successfully.")){
      toast.success("Account created successfully.")
            setErrorMessage(null)
        setTimeout(()=>{
          navigate("/verify-email",{state:{email:watch("email")}})
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



// check selected country Event handler

const selectedCountry = watch("country")

// check password Event handler

const password = watch("password")


// function to set phone prefix based on selected country
function handleChangePrefix(){
     const phone = countriesList.find(pre=>pre.Countryname === selectedCountry)
SetphonePrefix(phone?phone.countryPhone :"")
}


useEffect(()=>{

handleChangePrefix()

},[selectedCountry])




// JSX Start
  return (
    <>
   <div className={` ${styles["register-box"]} col-md-8`}>
     <div className=" p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden">
     <div className="register-logo d-flex justify-content-center mb-3">
     <img className="w-50" src={logo} alt="logo food-recipies" />
     </div>

        <h2 className="mb-4"> <i className="fa-solid fa-registered me-1"></i>Register</h2>
        <p className="auth-p-text">Welcome Back! Please enter your details</p>
        <form className="" onSubmit={handleSubmit(handleRegisterUser)}>

          {/* container of form */}
       <div className=" row form-box">
 <div className="col-md-6">
            <div className="left-forms d-flex flex-column gap-4">
         
         {/*  userName Input */}


<div className="position-relative">
  <div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
       <i className="fa-solid fa-user fs-4"></i>
  </div>             
   <input  className=" form-control rounded-0" type="text" placeholder="userName"
   {...register("userName",{required:"User Name Is Required",minLength:{
    value:4,
    message:"User Name Must Be At Least 4 Characters Long"
   },maxLength:{
    value:8,
    message:"The userName may not be greater than 8 characters"
   },pattern:{
    value:/^[A-Za-z]+[A-Za-z0-9]*\d$/,
    message:"The userName must end with numbers without spaces."
   }})}
   
   />

</div>
      {errors.userName && <p className="auth-error-message position-absolute start-0 top-100 ">{errors.userName.message}</p>}

</div>





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
         {errors.password && <p className="auth-error-message  "> {errors.password.message}</p>}

</div>

















 </div>

 </div>

<div className="col-md-6">
<div className="right-forms d-flex flex-column gap-4 ">

{/*  select country input */}
 <div className="d-flex gap-1 align-items-center position-relative w-100 overflow-hidden">
<div className="register-icons d-flex justify-content-center align-items-center">
<i className="fa-solid fa-globe"></i> 
 </div>  
  <select
  {...register("country",{required:"You Must Choose Your Country"})}
   className="p-1 fs-6 rounded-0 form-control" id="country">
    <option  disabled value="">Select Your Country</option>
    {countriesList.map(country=>
    <option className="country-option" key={country.Countryname} value={country.Countryname}>{country.Countryname}</option>
  
)}
    </select>  
          {errors.country && <p className="auth-error-message position-absolute start-0 top-100">{errors.country.message}</p>}
         
</div>  


{/*  phone number */}

<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
  <i className="fa-solid fa-phone"></i>
  </div>             
    <span onChange={()=>{
 
handleChangePrefix()

    }} className="d-inline-block register-span">{phonePrefix}</span>
    
    <input className="form-control rounded-0" type="tel" placeholder="PhoneNumber"
  {...register("phoneNumber",{required:"Phone Number Is Required",minLength:{
    value:10,
    message:"Phone Number Must Be At Least 10 Digits Long"
  },pattern:{
    value:/^\d+$/,
    message:"Phone Number Must Be Only Digits",
  }})} />
   
         {errors.phoneNumber && <p className="auth-error-message position-absolute start-0 top-100">{errors.phoneNumber.message}</p>}

</div>


{/* Confirmed password */}
<div className="d-flex gap-1 align-items-center position-relative w-100">
<div className="register-icons d-flex justify-content-center align-items-center">
<i className="fa-solid fa-lock"></i>
  </div>   
    <i onClick={()=>{
      setShowConfirmedPassword(!showConfirmedPassword)
}} className={`fa-solid ${showConfirmedPassword?"fa-eye":"fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`} title={!showConfirmedPassword ?"showPassword":"Hide Password"}></i>       
          
   <input className="form-control rounded-0" type={!showConfirmedPassword ?"password":"text"} placeholder="Confirm Password"
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






       </div>
   {errorMessage && <p className="text-center text-danger fw-bold">{errorMessage}</p>}
   <button className="auth-btn mt-4" type="submit" disabled={isSubmitting}>{isSubmitting ?<i className="fa-solid fa-spinner fa-spin"></i> :"Register"} </button>
        </form>
         <DevTool control={control} />
    </div>
   </div>
    </>


  )
}
