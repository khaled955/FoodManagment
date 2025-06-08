import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { ActionBtnGroupProps} from '../../../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import useRole from '../../../../Hooks/useRole';





const ActionBtnGroup = ({handleUpdateTitleAndBtnTextForm,recipeInfo,catDetails,handleUpdateAndAddFormHeader,handleSetCurrentId,handleSetCurrentCategory,handleShowDeletModal ,handleShowCategoryDetailsView,handleSetRecipeUpdateAction,hanldleViewClick}:ActionBtnGroupProps) => {

const navigate = useNavigate()
const isAdmine = useRole()
function handleUpdateRecipeActionAndNavigate(){
handleSetRecipeUpdateAction!();
    navigate("/dashboard/recipe-data",{state:{recipeAction:"Update",recipeInfo}})

}



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
          if(catDetails) {
            handleSetCurrentCategory?.(catDetails)
             handleShowCategoryDetailsView?.()
          }

         if(recipeInfo){
          hanldleViewClick!(recipeInfo)
         }


        }}>
          <BsEye className="me-2 text-success" />
          View
        </Dropdown.Item>

        {isAdmine && <Dropdown.Item onClick={()=>{

  // recipe module action 
if(recipeInfo){
    handleUpdateRecipeActionAndNavigate()
handleUpdateTitleAndBtnTextForm?.()
}

// category module action
if(catDetails){
  handleUpdateAndAddFormHeader?.(catDetails.name)
handleSetCurrentId?.(catDetails.id)
handleUpdateTitleAndBtnTextForm?.()
}
        }}>
          <BsPencil className="me-2 text-primary" />
          Edit
        </Dropdown.Item>
}

       {isAdmine&&  <Dropdown.Item onClick={()=>{
          if(catDetails) {
            handleSetCurrentId!(catDetails.id)

          }
          if(recipeInfo){
            handleSetCurrentId!(recipeInfo.id)
          }

          handleShowDeletModal!()
        }}>
          <BsTrash className="me-2 text-danger" />
          Delete
        </Dropdown.Item>

}

      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionBtnGroup;
