
import { RecipeDetailsProps } from "../../../../interfaces/interfaces";
import { FaTags, FaDollarSign } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import defaultImage from "../../../../assets/imags/loginbg.png";
import { baseURL } from "../../../../Api/Url";

export default function RecipeDetails({handleHideRecipeDetailsView, currentRecipe,}: RecipeDetailsProps) {



  function handleImage(path: string) {
    return path ? `${baseURL}/${path}` : defaultImage;
  }


  

  if (!currentRecipe) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-details-title"
      className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-start p-4 z-3"
    >
      <section
        className="bg-white rounded-4 shadow-lg p-4 position-relative w-100"
        style={{ maxWidth: "650px" }}
        aria-describedby="recipe-details-description"
      >
        {/* Close Button */}
        <button
          onClick={handleHideRecipeDetailsView}
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close recipe details"
        ></button>

        {/* Recipe Image */}
        <figure className="text-center mb-4 w-50 mx-auto rounded-circle overflow-hidden">
          <img
            src={handleImage(currentRecipe.imagePath)}
            alt={`Image of ${currentRecipe.name}`}
            className="shadow w-100"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
          <figcaption className="visually-hidden">{currentRecipe.name}</figcaption>
        </figure>

        {/* Recipe Name */}
        <header>
          <h2 id="recipe-details-title" className="fw-bold text-center text-dark mb-3">
            {currentRecipe.name}
          </h2>
        </header>

        {/* Recipe Description */}
        <p
          id="recipe-details-description"
          className="text-center text-secondary mb-4"
        >
          <strong>Description:</strong> {currentRecipe.description}
        </p>

        {/* Recipe Info Grid */}
        <div className="row text-center text-md-start" role="group" aria-label="Recipe metadata">
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Category">
              <MdCategory className="text-primary fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.category?.[0]?.name || "No Category"}
              </span>
            </div>
            <small className="text-muted">Category</small>
          </div>

          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Tag">
              <FaTags className="text-warning fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.tag?.name || "No Tag"}
              </span>
            </div>
            <small className="text-muted">Tag</small>
          </div>

          <div className="col-md-4 mb-3 d-flex flex-column align-items-center align-items-md-start">
            <div className="d-flex align-items-center gap-2" aria-label="Price">
              <FaDollarSign className="text-success fs-5" aria-hidden="true" />
              <span className="fw-semibold text-dark">
                {currentRecipe.price} EGP
              </span>
            </div>
            <small className="text-muted">Price</small>
          </div>
        </div>
      </section>
    </div>
  );
}
