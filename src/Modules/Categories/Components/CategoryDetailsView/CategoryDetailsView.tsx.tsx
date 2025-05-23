
 import { Category } from "../../../../interfaces/interfaces";

export default function CategoryDetailsView({
  onClick,
  currentCategory,
}: {
  onClick: () => void;
  currentCategory: Category | undefined;
}) {
  const formattedDate = currentCategory?.modificationDate
    ? new Date(currentCategory.modificationDate).toLocaleDateString()
    : "N/A";

  const formattedTime = currentCategory?.modificationDate
    ? new Date(currentCategory.modificationDate).toLocaleTimeString()
    : "N/A";

  return (
    <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center z-3">
      <div className="bg-white rounded-4 shadow-lg p-4 position-relative col-10 col-md-6">
        {/* Close Button */}
        <button
          onClick={onClick}
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
        ></button>

        {/* Header */}
        <h2 className="h4 fw-bold text-center mb-4 text-primary">
          <i className="fa-solid fa-circle-info me-2 text-info"></i>
          Category Details
        </h2>

        {/* Category Name */}
        <div className="mb-4 d-flex align-items-center">
          <i className="fa-solid fa-tag text-secondary me-2"></i>
          <span className="fw-semibold text-dark fs-5">
            {currentCategory?.name}
          </span>
        </div>

        {/* Creation Date */}
        <div className="mb-2 d-flex align-items-center">
          <i className="fa-solid fa-calendar-days text-secondary me-2"></i>
          <span className="text-muted">Date:</span>
          <span className="ms-2">{formattedDate}</span>
        </div>

        {/* Creation Time */}
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-clock text-secondary me-2"></i>
          <span className="text-muted">Time:</span>
          <span className="ms-2">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
