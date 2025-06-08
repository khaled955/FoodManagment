
export const baseURL = `https://upskilling-egypt.com:3006`;



/***************** Authentications_urls *******************************/
//   'https://upskilling-egypt.com:3006/api/v1/Users/?userName=ali&groups=1&pageSize=10&pageNumber=6' \

export const AUTHENTICATIONS_URLS = {
    LOGIN:`${baseURL}/api/v1/Users/Login`,
    SIGNUP:`${baseURL}/api/v1/Users/Register`,
    CRTEATE_ADMIN:`${baseURL}/api/v1/Users/Create`,
    DELET_USER_BY_ID:(id:number)=>`${baseURL}/api/v1/Users/${id}`,
    GET_USER_BY_ID:(id:number)=>`${baseURL}/api/v1/Users/${id}`,
    VERIFY_USER_ACCOUNT:`${baseURL}/api/v1/Users/verify`,
    GET_CURRENT_USER:`${baseURL}/api/v1/Users/currentUser`,
    GET_LOGED_USER: (pageSize:number,pageNumber:number,userName:string="",groups:string="")=> `${baseURL}/api/v1/Users/?userName=${userName}${groups?`&groups=${groups}`:""}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    UPDATE_USER_PROFILE:`${baseURL}/api/v1/Users/`,
    FORGET_PASSWORD:`${baseURL}/api/v1/Users/Reset/Request`,
    RESET_PASSWORD:`${baseURL}/api/v1/Users/Reset`,
    CHANGE_PASSWORD:`${baseURL}/api/v1/Users/ChangePassword`,

}




/***************** Categories-URLS *******************************/


export const CATEGORIES_URL = {
    GET_ALL_CATEGORIES:(pageSize:number,pageNumber:number,name:string="")=> `${baseURL}/api/v1/Category/?name=${name}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    GET_CATEGORY_BY_ID:(id:number)=>`${baseURL}/api/v1/Category/${id}`,
    CREATE_CATEGORY: `${baseURL}/api/v1/Category/`,
    UPDATE_CATEGORY_BY_ID:(id:number)=>`${baseURL}/api/v1/Category/${id}`,
   DELETE_CATEGORY_BY_ID:(id:number)=>`${baseURL}/api/v1/Category/${id}`,

}



/***************** Recipes-URLS *******************************/

export const RECIPES_URLS = {
    GET_ALL_RECIPES:(pageSize:number,pageNumber:number,name:string="",tagId:string="",categoryId:string="")=> `${baseURL}/api/v1/Recipe/?name=${name}&tagId=${tagId}&categoryId=${categoryId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    GET_RECIPES_BY_ID:(id:number)=>`${baseURL}/api/v1/Recipe/${id}`,
    CREATE_RECIPE: `${baseURL}/api/v1/Recipe/`,
   UPDATE_RECIPES_BY_ID:(id:number)=>`${baseURL}/api/v1/Recipe/${id}`,
   DELETE_RECIPES_BY_ID:(id:number)=>`${baseURL}/api/v1/Recipe/${id}`,

}




/****************** Tags **************************************/
 export const TAGS_URLS = {
    GET_ALL_TAGS: `${baseURL}/api/v1/Tag/`,
}



/****************** USER_RECIPE **************************************/
export const USER_FAV_URLS = {
GET_FAV_RECIPES :`${baseURL}/api/v1/userRecipe/`,
CREATE_FAV_RECIPE : `${baseURL}/api/v1/userRecipe/`,
DELET_FAV_RECIPE_BT_ID:(id:number)=>`${baseURL}/api/v1/userRecipe/${id}`



}