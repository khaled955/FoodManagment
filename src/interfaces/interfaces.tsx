
/* eslint-disable @typescript-eslint/no-explicit-any */


//  Auth Interfaces
 export interface UserAuthTokenPayload {
  exp: number; // Expiration time (usually a UNIX timestamp)
  iat: number; // Issued at time (UNIX timestamp)
  roles: string[]; // Array of roles/permissions
  userEmail: string;
  userGroup: string;
  userId: number;
  userName: string;
} 




export interface userAuthData {
  userAuth?:string | null;
  setUserAuth:(token:string| null)=>void;
}





//  Category interfaces

export interface Category {
  length: number;
  id: number;
  name: string;
  creationDate: string;       
  modificationDate: string;
}










export type MyformData = {
  name?: string
}




 export interface AdminActionsContextType {
  categoryList:Category[] | null;
  handleGetDataByAdmin: (url: string) => Promise<any>;
  handleAddDataByAdmin:( catData:MyformData,addUrl: string,msg:string) => Promise<any>;
  handleUpdateDataByAdmin:( catData:MyformData,updateUrl: string,msg:string,id:number) => Promise<any>;
  handleDeleteDataByAdmin:(deletUrl: string,msg:string,id:number) => Promise<any>;
  handleSortCategoriesByName:()=>void;
  handleReverseCategoriesByName:()=>void;
}



//  Recipes interface 
export interface FoodCategory {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface FoodTag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface FoodItem {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number | string | undefined;
  creationDate: string;
  modificationDate: string;
  category: FoodCategory[];
  tag: FoodTag;
}



// body component props 
 export interface BodyProps {
  header: string;
  description: string;
  item: string;
  recipeAction?:string;
  onClick: () => void;
  handleAddTitleAndBtnTextForm?: () => void;
  handleUpdateAndAddFormHeader?: (headerName: string) => void;
  handleSetRecipeAddAction?:()=>void
}



export interface ActionBtnGroupProps {
  handleUpdateTitleAndBtnTextForm?: () => void;
  handleUpdateAndAddFormHeader?: (headerName: string) => void;
  catDetails?: Category;
  handleSetCurrentId?: (current: number) => void;
  handleSetCurrentCategory?: (currentCat: Category) => void;
  handleShowDeletModal?: () => void;
  handleShowCategoryDetailsView?: () => void;
  recipeInfo?:FoodItem;
  handleSetRecipeUpdateAction?:()=>void;
  hanldleViewClick?:(current:FoodItem)=>void;
}



export interface DeletConfirmationModalProps {
  onClick: () => void;
  currentId: number;
  handleHideDeletModal: () => void;
  actionDeletType: string;
  type: string;
  handleDeleteDataByAdmin?:(deletUrl:string, msg:string, id:number)=>void;
  handleDeleteRecipesByAdmin?:(deletUrl:string, msg:string)=>Promise<any>;
}




export interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}



export interface RecipeFormData {
  categoriesIds: string;
  description: string;
  name: string;
  price: string;
  recipeImage: FileList;
}


export interface RecipeFormData {
  categoriesIds: string;
  description: string;
  name: string;
  price: string;
  recipeImage: FileList;
  tagId:string;
}



 export interface RecipeListActionProps {
  handleSetRecipeUpdateAction: () => void;
  handleSetRecipeAddAction: () => void;
}

 export interface RecipeDetailsProps {
  handleHideRecipeDetailsView: () => void;
  currentRecipe: FoodItem | null;
}








export interface HeaderProps {
  imgePath: string;
  titleOne: string;
  titleTwo: string;
  text: string;
}



export interface AddAndUpdateFormProps {
  title: string;
  btnText: string;
  onClick: () => void;
  updateAndAddFormHeader: string;
  currentId: number;
  handleHideUpdateAndUpdateForm: () => void;
}