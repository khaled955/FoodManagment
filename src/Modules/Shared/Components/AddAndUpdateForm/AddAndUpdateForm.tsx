
import { useForm } from "react-hook-form";
import { AdminActions } from "../../../../Context/AdminActions.context";
import { useContext } from "react";
import { AddAndUpdateFormProps, MyformData } from "../../../../interfaces/interfaces";
import { CATEGORIES_URL } from "../../../../Api/Url";

const UPdate_URL = "/api/v1/Category/";

export default function AddAndUpdateForm({
  title,
  btnText,
  onClick,
  updateAndAddFormHeader,
  currentId,
  handleHideUpdateAndUpdateForm,
}: AddAndUpdateFormProps) {


  const { handleAddDataByAdmin, handleUpdateDataByAdmin,isLoading } = useContext(AdminActions)!;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<MyformData>({defaultValues:{name:updateAndAddFormHeader}});

  const onSubmit = (data: MyformData) => {
    if (title === "Add New Category") {
      handleAddDataByAdmin(data, CATEGORIES_URL.CREATE_CATEGORY, "New Category Add Successfully");
    } else if (title === "Update Category") {
      handleUpdateDataByAdmin(data, UPdate_URL, "Updated Category Done Successfully", currentId);
    }

    setTimeout(() => {
      handleHideUpdateAndUpdateForm();
    }, 1000);
  };

  return (
    <section
      aria-labelledby="form-title"
      className="position-fixed top-0 bottom-0 start-0 end-0 add-update-box row justify-content-center align-items-center"
    >
      <div className="content-box col-10 col-md-6 position-relative" role="dialog" aria-modal="true">
        <button
          onClick={onClick}
          aria-label="Close form"
          className="btn-close-btn-update-add-form position-absolute end-0 top-0 p-2 bg-black text-white fw-bold d-flex justify-content-center align-items-center"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 id="form-title" className="h4 fw-bold my-4">
          {title || "Add Category"} {updateAndAddFormHeader}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="category-name" className="form-label">
              Category Name
            </label>
            <input
              id="category-name"
              {...register("name", { required: "Category Name Is Required" })}
              className="form-control"
              type="text"
              placeholder="Write Category Name..."
            />
            {errors.name && (
              <p className="auth-error-message" role="alert" aria-live="polite">
                {errors.name.message}
              </p>
            )}
          </div>

          <button disabled={isLoading} className="auth-btn my-4" type="submit">
           {isLoading ?<i className="fa-solid fa-spinner fa-spin"></i> :  btnText || "Save"}
          </button>
        </form>
      </div>
    </section>
  );
}
