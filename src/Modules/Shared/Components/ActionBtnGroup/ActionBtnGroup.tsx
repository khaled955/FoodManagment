import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { Category } from '../../../../interfaces/interfaces';





const ActionBtnGroup = ({handleUpdateTitleAndBtnTextForm,catDetails,handleUpdateAndAddFormHeader,handleSetCurrentId,handleSetCurrentCategory,handleShowDeletModal ,handleShowCategoryDetailsView}:{handleUpdateTitleAndBtnTextForm:()=>void,handleUpdateAndAddFormHeader:(headerName:string)=>void,catDetails:Category,handleSetCurrentId:(current:number)=>void,handleSetCurrentCategory:(currentCat:Category)=>void,handleShowDeletModal:()=>void,handleShowCategoryDetailsView:()=>void}) => {









  return (
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        className="btn btn-link p-0 border-0"
        id="dropdown-custom-button"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm rounded-3">
        <Dropdown.Item onClick={()=>{
             handleSetCurrentCategory(catDetails)
             handleShowCategoryDetailsView()
        }}>
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        <Dropdown.Item onClick={()=>{

handleUpdateTitleAndBtnTextForm()
handleUpdateAndAddFormHeader(catDetails.name)
handleSetCurrentId(catDetails.id)
        }}>
          <BsPencil className="me-2 text-primary" />
          Edit
        </Dropdown.Item>


        <Dropdown.Item onClick={()=>{
          handleSetCurrentId(catDetails.id)
          handleShowDeletModal()
        }}>
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionBtnGroup;
