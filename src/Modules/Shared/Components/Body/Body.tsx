
export default function Body({header,description,item ,onClick,handleAddTitleAndBtnTextForm ,handleUpdateAndAddFormHeader}:{header:string,description:string,item:string ,onClick:()=>void,handleAddTitleAndBtnTextForm:()=>void ,handleUpdateAndAddFormHeader:(headerName:string)=>void}) {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 py-3 rounded-2 my-2 body-box">
     <div className="body-text">
        <h2 className="h5">{header}</h2>
        <p className="text-info">{description}</p>
     </div>
     <div className="body-btn">
        <button onClick={()=>{
          handleUpdateAndAddFormHeader("")
          handleAddTitleAndBtnTextForm()
          onClick()
        }}> Add New {item}</button>
     </div>
    </div>
  )
}
