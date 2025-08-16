/* eslint-disable @typescript-eslint/no-unused-vars */
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AuthLayout from './Modules/Shared/Components/AuthLayout/AuthLayout';
import Login from './Modules/Authintication/Componenets/Login/Login';
import Register from './Modules/Authintication/Componenets/Register/Register';
import ResetPassword from './Modules/Authintication/Componenets/ResetPassword/ResetPassword';
import VerifyEmail from './Modules/Authintication/Componenets/VerifyEmail/VerifyEmail';
import ForgetPassword from './Modules/Authintication/Componenets/ForgetPassword/ForgetPassword';
import NotFound from './Modules/Shared/Components/NotFound/NotFound';
import MasterLayout from './Modules/Shared/Components/MasterLayout/MasterLayout';
import RecipesList from './Modules/Recipes/Components/RecipesList/RecipesList';
import RecipeData from './Modules/Recipes/Components/RecipeData/RecipeData';
import CategoriesList from './Modules/Categories/Components/CategoriesList/CategoriesList';
import UsersList from './Modules/Users/Components/UsersList/UsersList';
import FavouritesList from './Modules/Favourites/Components/FavouritsList/FavouritesList';
import ProtectedRoute from './Modules/Shared/Components/ProtectedRoute/ProtectedRoute';
import ChangePassword from './Modules/Shared/Components/ChangePassword/ChangePassword';
import UserAuthContext from './Context/UserAuth.context';
import GuestRoute from './Modules/Shared/Components/GuestRoute/GuestRoute';
import AdminActionsProvider from './Context/AdminActions.context';
import { useState } from 'react';
import { FoodItem } from './interfaces/interfaces';
import useOnline from './Hooks/useOnline';
import { HelmetProvider } from 'react-helmet-async';
import Dashboard from './Modules/Dashboard/Components/Dashboard/Dashboard';

function App() {

const [_recipeAction , setRecipeAction] = useState("add")
const [_currentRecipe , _setCurrentRecipe] = useState<FoodItem | null>(null)
 const isOnline = useOnline()

function handleSetRecipeAddAction(){
  setRecipeAction("add")
}

function handleSetRecipeUpdateAction(){
  setRecipeAction("update")
}


 


const routes = createBrowserRouter([{path:"/" ,element: <GuestRoute><AuthLayout/> </GuestRoute>   ,children:[
{index:true , element:<Login />},
{path:"login" , element:<Login />},
{path:"register" , element:<Register/>},
{path:"reset-password" , element:<ResetPassword/>},
{path:"verify-email" , element:<VerifyEmail/>},
{path:"forget-password" , element:<ForgetPassword/>},
{path:"*" , element:<NotFound/>},


]},

{path:"/dashboard",element:  <ProtectedRoute><MasterLayout/> </ProtectedRoute>,children:[
  {index:true , element:<Dashboard/>},
  {path:"recipes", element:<RecipesList handleSetRecipeUpdateAction={handleSetRecipeUpdateAction} handleSetRecipeAddAction={handleSetRecipeAddAction}/>},
  {path:"recipe-data" , element:<RecipeData/>},
  {path:"categories" , element: <CategoriesList/>},
  {path:"users" , element: <UsersList/>},
  {path:"favs" , element:<FavouritesList/>},
  {path:"change-password" , element:<ChangePassword/>},
  {path:"*" , element:<NotFound/>},

]}



])



  return (
    <>
    {!isOnline && <p className='position-fixed top-0 start-50 translate-middle-x text-white fw-bold bg-danger online-alert p-2'> Please Check Internet Connection  <i className="fa-solid fa-wifi"></i></p>}
   <HelmetProvider>
     <UserAuthContext>
      <AdminActionsProvider>
      <RouterProvider router={routes}></RouterProvider>
      </AdminActionsProvider>

    </UserAuthContext>
    
   </HelmetProvider>
     <Toaster/>
    </>
  )
}

export default App
