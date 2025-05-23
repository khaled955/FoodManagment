import largeCircle from "../../../../assets/imags/circlelarg.png"
import mediumCircle from "../../../../assets/imags/circlemd.png"
import smallCircle from "../../../../assets/imags/circlesmall.png"

export default function Header({imgePath,titleOne,text ,titleTwo}:{imgePath:string,titleOne:string,text:string ,titleTwo:string}) {
  return (
    <section className="position-relative overflow-hidden">
     <div className="home-poster container-fluid p-2">
      <div className="row align-items-center">
 
  <div className="header-box col-md-6 h-100">
    <div className="header-text ">
      <h2 className="heaer-info">{titleOne} <span>{titleTwo}</span></h2>
      <p>{text}</p>
    </div>
  </div>
  <div className="header-box col-md-6 d-flex justify-content-end">
    <img className="w-50" src={imgePath} alt="photo of girl" />
  </div>




     </div>
     </div>
<div>
       <img className="position-absolute top-0 mt-3 ms-4" src={mediumCircle} alt="large-ellipse" />
     <img className="position-absolute bottom-0 mt-3 large-ellipse-left" src={largeCircle} alt="large-ellipse" />
</div>
<div>
       <img className="position-absolute top-0 mt-3 start-50 translate-middle-x" src={largeCircle} alt="large-ellipse" />
     <img className="position-absolute bottom-0 start-50 mb-3 large-ellipse-left" src={mediumCircle} alt="large-ellipse" />
</div>
<div>
       <img className="position-absolute top-0 mt-3 ms-4" src={mediumCircle} alt="large-ellipse" />
     <img className="position-absolute bottom-0 mt-3 large-ellipse-left" src={largeCircle} alt="large-ellipse" />
</div>

       <img className="position-absolute top-0 mt-3 small-circle-one" src={smallCircle} alt="large-ellipse" />
       <img className="position-absolute top-50 mt-3 ms-4 small-circle-two translate-middle-y" src={smallCircle} alt="large-ellipse" />
       <img className="position-absolute top-50 large-circle-three" src={largeCircle} alt="large-ellipse" />






    </section>
  )
}
