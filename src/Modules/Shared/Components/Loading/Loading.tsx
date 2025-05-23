

export default function Loading() {
  return (
    <div className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-black z-3 loading-box">
      <div className="text-center text-white">
        <i className="fa-solid fa-utensils fa-3x text-primary mb-4 fa-spin text-white"></i>
        <h4 className="fw-bold text-secondary">Loading Food Data...</h4>
        <p className="text-muted">Please wait while we prepare everything.</p>
      </div>
    </div>
  );
}
