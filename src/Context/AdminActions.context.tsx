/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { AdminActionsContextType, Category } from "../interfaces/interfaces";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const  AdminActions = createContext<AdminActionsContextType | undefined>( undefined)


const getURL = "/api/v1/Category/?pageSize=10&pageNumber=1"
export default function AdminActionsProvider({children}:{children:ReactNode}){

    const [categoryList , setCategoryList] = useState<Category[] | null>(null)!;
    const [isLoading , setIsLoading] = useState(false);

   type formData = {
  name?:string
}


//  Get Data To Display





const handleGetDataByAdmin = useCallback(async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url);
    setCategoryList(data.data);
    return data
  } catch (err) {
    console.error(err);
  }
}, [setCategoryList]);







// Add Data
 async function handleAddDataByAdmin( catData:formData,addUrl:string, msg:string):Promise<any>{


               setIsLoading(true)
  const toastId = toast.loading("Waiting")
try {
    
    const options = {
        url:addUrl,
        method:"POST",
        data:catData,
        
    }

     await axiosInstance.request(options)
    
    toast.success(msg)
    await handleGetDataByAdmin(getURL)

    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message)
       
    }


}finally{

            setIsLoading(false)
        toast.dismiss(toastId)
    }





    }
    


// update data By Admin
 async function handleUpdateDataByAdmin(catData:formData,updateUrl:string, msg:string, id:number):Promise<any>{
    setIsLoading(true)
  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:updateUrl+ id,
        method:"PUT",
        data:catData,
        
    }

     await axiosInstance.request(options)
    toast.success(msg)
     await handleGetDataByAdmin(getURL)
    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message)
    }


}finally{
    setIsLoading(false)
        toast.dismiss(toastId)
    }







}




// Delet Specific category
 async function handleDeleteDataByAdmin(deletUrl:string, msg:string, id:number):Promise<any>{

    setIsLoading(true)
  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:deletUrl+ id,
        method:"DELETE",
        
        
    }

    await axiosInstance.request(options)
    toast.success(msg)
     await handleGetDataByAdmin(getURL)
    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
        setIsLoading(false)
    }







}



// sort categories name alphabetical 

function handleSortCategoriesByName(){
   if (categoryList) {
  const sortedCategoriesList = [...categoryList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  setCategoryList(sortedCategoriesList);
}

}
function handleReverseCategoriesByName(){
   if (categoryList) {
  const sortedCategoriesList = [...categoryList].sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  setCategoryList(sortedCategoriesList);
}

}








    return <AdminActions.Provider value={{handleGetDataByAdmin ,handleAddDataByAdmin ,handleUpdateDataByAdmin,categoryList,handleDeleteDataByAdmin,handleSortCategoriesByName,handleReverseCategoriesByName,isLoading}}>

{children}
    </AdminActions.Provider>
}