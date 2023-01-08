import Masterlayout from "../MasterLayout/Masterlayout";
import Home from "../Home/Home";
import Movies from "../Movies/Movies";
import TvShows from "../TvShows/TvShows";
import {  createHashRouter, RouterProvider } from "react-router-dom";
import People from "../People/People";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Details from "../Details/Details";




function App() {
let routes = createHashRouter ([
  {path:'/',element:<Masterlayout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"movies",element:<ProtectedRoute><Movies/></ProtectedRoute>},
    {path:"tvshows",element:<ProtectedRoute><TvShows/></ProtectedRoute>},
    {path:"people",element:<ProtectedRoute><People/></ProtectedRoute>},
    {path:"details/:mediatype/:id",element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},

  
  ]}
])

  return (
   
   <RouterProvider router={routes}/>
  )
}

export default App;
