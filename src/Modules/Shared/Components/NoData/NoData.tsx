import photo from "../../../../assets/imags/nodata.png"
export default function NoData() {
  return (
    <div className="">
      <div className="img-box-no-data text-center">
        <img src={photo} alt="girl img for no data" />
      </div>
      <div className="description-box text-center">
        <h4>No Data !</h4>
        <p>Sorry You Dont Have Any Data To Display You Can Add New Item</p>
      </div>
    </div>
  )
}
