import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout.jsx';
import Tasks from './components/Tasks.jsx';
import TaskDetail from './components/taskDetail.jsx';
import Add from './components/Add';
import Delete from './components/Delete';
import Update from './components/Update';
import Login from './components/Login';
import PrivateRounter from './components/PrivateRounter';
import Logout from './components/Logout';
import { store } from './redux/store'
import { Provider } from 'react-redux'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [{
      path: "/",
      element:  <PrivateRounter><Tasks></Tasks></PrivateRounter>
    },  {
      path: "/:taskId",
      element: <PrivateRounter><TaskDetail></TaskDetail></PrivateRounter>
    
    },{
      path: "/add",
      element: <PrivateRounter><Add> </Add></PrivateRounter>
    },{
      path: "/delete/:taskId",
      element:<PrivateRounter><Delete></Delete></PrivateRounter>
    },{
      path: "/update/:taskId",
      element:<PrivateRounter><Update></Update></PrivateRounter>
    }]
    
  },
  {
    path: "/login",
    element: <Login></Login>
  },{
    path: "/logout",
    element: <Logout></Logout>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
            <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
