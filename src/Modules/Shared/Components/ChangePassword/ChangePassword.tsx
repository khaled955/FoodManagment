
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import logo from "../../../../assets/imags/logo.png";
import styles from "./ChangePassword.module.css";
import { AUTHENTICATIONS_URLS } from "../../../../Api/Url";
import axiosInstance from "../../../../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";

type formData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formData>({ mode: "onChange" });

  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");

  async function handleRegisterUser(userInfo: formData) {
    const toastId = toast.loading("Waiting....");

    try {
      const { data } = await axiosInstance.put(
        AUTHENTICATIONS_URLS.CHANGE_PASSWORD,
        userInfo
      );
      if (data.message === "Password has been updated successfully") {
        toast.success(data.message);
        setErrorMessage(null);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
        toast.error(error.response?.data.message);
      } else {
        setErrorMessage("Error");
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <section
      aria-labelledby="change-password-heading"
      className={`${styles["register-box"]} d-flex justify-content-center align-items-center`}
    >
      <div className={`p-4 mt-4 bg-white rounded-2 shadow-lg overflow-hidden ${styles["register-parent"]}`} role="form">
        <div className="register-logo d-flex justify-content-center mb-3">
          <img className="w-75" src={logo} alt="Food Recipes Logo" />
        </div>

        <h2 id="change-password-heading" className="text-center">Change Your Password</h2>
        <p className="mb-4 text-danger text-center">Please Enter Details Below</p>

        <form onSubmit={handleSubmit(handleRegisterUser)} noValidate>
          <div className="form-box">
            <div className="left-forms flex-grow-1">

              {/* Old Password */}
              <div className="mb-3 position-relative">
                <label htmlFor="oldPassword" className="form-label">Old Password</label>
                <div className="d-flex gap-1 align-items-center position-relative">
                  <div className="register-icons d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    role="button"
                    tabIndex={0}
                  />
                  <input
                    id="oldPassword"
                    className="form-control rounded-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    {...register("oldPassword", {
                      required: "Old Password Is Required",
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                        message: "Must include upper/lowercase, number, and special character",
                      },
                    })}
                    autoComplete="current-password"
                  />
                </div>
                {errors.oldPassword && (
                  <p className="text-danger error-message" role="alert" aria-live="polite">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="mb-3 position-relative">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <div className="d-flex gap-1 align-items-center position-relative">
                  <div className="register-icons d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    role="button"
                    tabIndex={0}
                  />
                  <input
                    id="newPassword"
                    className="form-control rounded-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...register("newPassword", {
                      required: "New Password Is Required",
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                        message: "Must include upper/lowercase, number, and special character",
                      },
                      validate: (value) =>
                        value !== oldPassword || "New Password must differ from Old Password",
                    })}
                    autoComplete="new-password"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-danger error-message" role="alert" aria-live="polite">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3 position-relative">
                <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                <div className="d-flex gap-1 align-items-center position-relative">
                  <div className="register-icons d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <i
                    onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                    className={`fa-solid ${showConfirmedPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 me-3 eye-pointer`}
                    aria-label={showConfirmedPassword ? "Hide password" : "Show password"}
                    role="button"
                    tabIndex={0}
                  />
                  <input
                    id="confirmNewPassword"
                    className="form-control rounded-0"
                    type={showConfirmedPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", {
                      required: "Confirmed Password Is Required",
                      validate: (value) =>
                        value === newPassword || "Passwords Do Not Match",
                    })}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-danger error-message" role="alert" aria-live="polite">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-center text-danger" role="alert" aria-live="polite">
              {errorMessage}
            </p>
          )}

          <button className="auth-btn register-btn" type="submit">Change Password</button>
        </form>
        <DevTool control={control} />
      </div>
    </section>
  );
}
