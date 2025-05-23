/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { AdminActionsContextType, Category } from "../interfaces/interfaces";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const  AdminActions = createContext<AdminActionsContextType | undefined>( undefined)


const getURL = "/api/v1/Category/?pageSize=10&pageNumber=1"
export default function AdminActionsProvider({children}:{children:ReactNode}){

    const [categoryList , setCategoryList] = useState<Category[] | null>(null)!;
    

   type formData = {
  name?:string
}


//  Get Data To Display


     async function handleGetDataByAdmin(url:string):Promise<any>{

try {
    const options = {
        url,
        method:"GET",
    }

    const {data} = await axiosInstance.request(options)
    setCategoryList(data.data)
    
} catch (error) {
    
console.log(error)

}





    }
    


// Add Data
 async function handleAddDataByAdmin( catData:formData,addUrl:string, msg:string):Promise<any>{
  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:addUrl,
        method:"POST",
        data:catData,
        
    }

    const {data} = await axiosInstance.request(options)
    console.log(data)
    toast.success(msg)
    await handleGetDataByAdmin(getURL)

    
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
    }





    }
    


// update data By Admin
 async function handleUpdateDataByAdmin(catData:formData,updateUrl:string, msg:string, id:number):Promise<any>{

  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:updateUrl+ id,
        method:"PUT",
        data:catData,
        
    }

    const {data} = await axiosInstance.request(options)
    console.log(data)
    toast.success(msg)
     await handleGetDataByAdmin(getURL)
    
} catch (error) {
    if(isAxiosError(error)){
        console.log(error)
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
    }







}




// Delet Specific category
 async function handleDeleteDataByAdmin(deletUrl:string, msg:string, id:number):Promise<any>{

  const toastId = toast.loading("Waiting")
try {
    const options = {
        url:deletUrl+ id,
        method:"DELETE",
        
        
    }

    const {data} = await axiosInstance.request(options)
    console.log(data)
    toast.success(msg)
     await handleGetDataByAdmin(getURL)
    
} catch (error) {
    if(isAxiosError(error)){
        console.log(error)
        toast.error(error.response?.data.message)
    }


}finally{
        toast.dismiss(toastId)
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








    return <AdminActions.Provider value={{handleGetDataByAdmin ,handleAddDataByAdmin ,handleUpdateDataByAdmin,categoryList,handleDeleteDataByAdmin,handleSortCategoriesByName,handleReverseCategoriesByName}}>

{children}
    </AdminActions.Provider>
}