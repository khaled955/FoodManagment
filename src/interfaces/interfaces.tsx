
/* eslint-disable @typescript-eslint/no-explicit-any */
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
