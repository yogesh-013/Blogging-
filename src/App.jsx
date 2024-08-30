import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header  , Footer} from './components/index.js'



function App() {
  const [loading , setLoading ] = useState(false)
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
    <div className='flex flex-col min-h-screen content-between  bg-cover bg-center bg-no-repeat ' style={{
      backgroundImage: 'url(public/img/back_image.jpeg) '
    }}>
      <div className='w-full block'>
        <Header />
        <main className='flex-grow opacity-100'>
       <Outlet />
        </main>
        <Footer />
      </div>
    </div>
   
  ):(
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-600" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="text-lg font-bold text-gray-600 mb-2">Loading...</div>
      <div className="text-gray-500 mb-4">Please wait while we load the application.</div>
      <div className="progress-bar bg-gray-200 h-2 rounded-full mb-4">
        <div className="progress-bar-value bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
      </div>
    </div>
  </div>
  )
}

export default App
