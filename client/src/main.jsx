import React,{StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css"
import HomePage from './Components/Home';
import Layout from './Components/Layout';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import ManagerDashboard from './Components/ManagerDashboard';
import StaffDashboard from './Components/StaffDashboard';
import { persistor, store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AboutPage from './Components/About';



const router = createBrowserRouter([
  {
    path :'/',
    element: <Layout/>,
    children : [
      {
        path:'',
        element : <HomePage/>
      },
      {
        path:'about',
        element : <AboutPage/>
      },
      {
        path:'login',
        element : <LoginPage/>
      },
      {
        path:'register',
        element : <RegisterPage/>
      },
      {
        path:'manager-panel',
        element : <ManagerDashboard/>
      },
      {
        path:'staff-panel',
        element : <StaffDashboard/>
      },
      

      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
</StrictMode>
)
