import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'

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
    <div className='min-h-screen flex flex-wrap content-between
    bg-gray-200 '>
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
