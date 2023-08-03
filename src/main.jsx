import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './layout/Route.jsx';
import MyContext from './Components/MyContext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      
    <MyContext><RouterProvider router={router} /></MyContext>
    </QueryClientProvider>
  
  </React.StrictMode>,
  
)
