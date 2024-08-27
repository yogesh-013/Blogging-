import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Protected({children , authentication = true}) {
  const navigate = useNavigate()
  const {loader , setLoader } = useState()
  const authStatus = useSelector((state)=>state.auth.status)
  useEffect(()=>{
     if(authStatus){
        navigate("/")
     }else{
        navigate("/login")
     }
     setLoader(false)
  },[navigate , authStatus])
  return (
    loader?<h1>Loading....</h1> : <>{children}</>
  )
}

export default Protected
