import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/Home/Home/Home";
import Main from "../Components/Main/Main";
import Login from "../Components/Login";
import Register from "../Components/Register";
import SingleData from "../Components/SingleData";
// MyContext.js
import { createContext } from 'react';
import Updatetask from "../Components/UpdateTask/Updatetask";
const contextValue = "Hello from Context!";


const router = createBrowserRouter([
      {
            path: "/",
            element: <Main></Main>,

            children: [{
                  path: "/",
                  element: <Home></Home>,

            },{
                  path: "/login",
                  element: <Login></Login>,

            },{
                  path: "/register",
                  element: <Register></Register>,

            },{
                  path:'singledata/:id',
                  element:<SingleData></SingleData>
            },
            {
                  path:'update/:id',
                  element:<Updatetask></Updatetask>
            }


            ]
      },
]);

export default router;