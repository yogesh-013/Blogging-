import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import AddPost from './components/pages/AddPost.jsx'
import AllPost from './components/pages/AllPost.jsx'
import Login from './components/pages/Login.jsx'
import Signup from './components/pages/Signup.jsx'
import Post from './components/pages/Post.jsx'
import EditPost from './components/pages/EditPost.jsx'
import Protected from './components/AuthLayout.jsx'
const router = createBrowserRouter([
  {
    path : '/' , 
    element : <App/>,
    children : [
      {
        path : '/' , 
        element : <Home/>
        
      } , 
      {
        path : '/login' , 
        element : (
        <Protected authentication = {false}>
          <Login/>
        </Protected>)
      },
      {
        path : '/signup' , 
        element : (
        <Protected authentication = {false}>
          <Signup/>
        </Protected>)
      },
      {
        path: "/all-posts",
        element: (
            <Protected authentication = {true}>
                {" "}
                <AllPost />
            </Protected>
        ),
    },
    {
      path: "/add-post",
      element: (
          <Protected authentication = {true}>
              {" "}
              <AddPost />
          </Protected>
      ),
  },
  {
      path: "/edit-post/:slug",
      element: (
          <Protected authentication = {true}>
              {" "}
              <EditPost />
          </Protected>
      ),
  },
  {
      path: "/post/:slug",
      element: <Post />,
  },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
