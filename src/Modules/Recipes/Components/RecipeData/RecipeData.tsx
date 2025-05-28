
import { Link, useLocation } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";

export default function RecipeData() {
  const location = useLocation();
  const recipeAction = location.state?.recipeAction || "Add";
  const recipeInfo = location.state?.recipeInfo || null;

  return (
    <main className="container-fluid" role="main" aria-labelledby="recipe-form-title">
      {/* Header Section */}
      <header className="row header-recipes justify-content-between align-items-center py-4 px-3 my-3">
        <div className="recipes-text col-md-6">
          <h1 id="recipe-form-title" className="h4">
            {recipeAction === "Add" ? (
              <>
                Fill the <span className="text-success">Recipes</span>!
              </>
            ) : (
              <>
                Update the Current <span className="text-success">Recipes</span>!
              </>
            )}
          </h1>
          <p>
            You can now fill the meals easily using the table and form. Click below to return to the recipes list.
          </p>
        </div>
        <nav className="recipes-btn col-md-6 d-flex justify-content-end" aria-label="Recipe Navigation">
          <Link
            className="text-white bg-success rounded-2 px-2 py-1"
            to="/dashboard/recipes"
            aria-label="Go to all recipes"
          >
            All The Recipes <i className="fa-solid fa-right-long" aria-hidden="true"></i>
          </Link>
        </nav>
      </header>

      {/* Instruction */}
      <section aria-label="Recipe Form Type" className="mb-3">
        {recipeAction === "Add" ? (
          <p className="recipe-add-p" id="add-mode-desc">
            Add New Recipe
          </p>
        ) : (
          <p className="recipe-add-p text-black" id="update-mode-desc">
            Update Current Recipe
          </p>
        )}
      </section>

      {/* Form Section */}
      <section aria-labelledby="recipe-form-section">
        <h2 id="recipe-form-section" className="visually-hidden">
          Recipe Form
        </h2>
        <RecipeForm recipestate={recipeAction} recipeInfo={recipeInfo} />
      </section>
    </main>
  );
}

