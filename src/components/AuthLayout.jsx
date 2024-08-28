import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Protected({children , authentication = true}) {
  const navigate = useNavigate()
  const {loader , setLoader } = useState()
  const authStatus = useSelector(state=>state.auth.status)
  console.log(authStatus);
  if((authStatus !== authentication)  && authentication){
   console.log("login");
   
  }
  if((authStatus !== authentication)  && !authentication){
   console.log("Home");
   
  }
  useEffect(()=>{
     if((authStatus !== authentication)  && authentication){
      navigate("/login")
     }else if((authStatus !== authentication)  && !authentication){
        navigate("/")
     }
     
  },[navigate , authStatus])
  return (
     <>{children}</>
  )
}

export default Protected
