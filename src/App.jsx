import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header  , Footer} from './components/index.js'



function App() {
  const [loading , setLoading ] = useState(true)
const dispatch = useDispatch()
useEffect(()=>{
   authService.getCurrentUser().then((userData)=>{
     if(userData){
      dispatch(login(userData))
     }else{
      dispatch(logout())
     }
   }).finally(()=>setLoading(false)   
   ) 
} , [])
  return  !loading ?(
    <div className='  bg-pink-500 h-full flex flex-wrap content-between
   '>
      <div>
        <Header/>
        <main>
        <Outlet/>
        </main>
       
        <Footer/>
      </div>
    </div>
  ):(
    <h1>Loading.....</h1>
  )
}

export default App
