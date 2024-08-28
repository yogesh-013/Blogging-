import React from 'react'
import authService from '../../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
function Logout() {
   const dispatch = useDispatch()
 function logouthHandler(){
    authService.logout().then(()=>{
       dispatch(logout())
    }).catch((error)=>{
        console.log(error)
    })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 
    hover:bg-blue-100 rounded-full ' onClick={logouthHandler}>
        Logout
    </button>
  )
}

export default Logout
