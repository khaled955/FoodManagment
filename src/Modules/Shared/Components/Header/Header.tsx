
import largeCircle from "../../../../assets/imags/circlelarg.png";
import mediumCircle from "../../../../assets/imags/circlemd.png";
import smallCircle from "../../../../assets/imags/circlesmall.png";
import { HeaderProps } from "../../../../interfaces/interfaces";

export default function Header({ imgePath, titleOne, text, titleTwo }: HeaderProps) {
  return (
    <section className="position-relative overflow-hidden" role="region" aria-labelledby="header-title">
      <div className="home-poster container-fluid p-2">
        <div className="row align-items-center">
          <div className="header-box col-md-6 h-100">
            <header className="header-text">
              <h2 id="header-title" className="heaer-info">
                {titleOne} <span>{titleTwo}</span>
              </h2>
              <p>{text}</p>
            </header>
          </div>

          <div className="header-box col-md-6 d-flex justify-content-end">
            <figure className="w-50 m-0">
              <img
                className="img-fluid"
                src={imgePath}
                alt="Main header visual"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <img className="position-absolute top-0 mt-3 ms-4 img-circle" src={mediumCircle} alt="" aria-hidden="true" />
      <img className="position-absolute bottom-0 mt-3 large-ellipse-left" src={largeCircle} alt="" aria-hidden="true" />

      <img className="position-absolute top-0 mt-3 start-50 translate-middle-x" src={largeCircle} alt="" aria-hidden="true" />
      <img className="position-absolute bottom-0 start-50 mb-3 large-ellipse-left" src={mediumCircle} alt="" aria-hidden="true" />

      <img className="position-absolute top-0 mt-3 ms-4" src={mediumCircle} alt="" aria-hidden="true" />
      <img className="position-absolute bottom-0 mt-3 large-ellipse-left" src={largeCircle} alt="" aria-hidden="true" />

      <img className="position-absolute top-0 mt-3 small-circle-one" src={smallCircle} alt="" aria-hidden="true" />
      <img className="position-absolute top-50 mt-3 ms-4 small-circle-two translate-middle-y" src={smallCircle} alt="" aria-hidden="true" />
      <img className="position-absolute top-50 large-circle-three" src={largeCircle} alt="" aria-hidden="true" />
    </section>
  );
}
