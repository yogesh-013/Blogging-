import React from 'react'
import { Input , Button , Select , RTE} from '../index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../appwrite/service.js'
import { useForm } from 'react-hook-form'
function Postform({post}) {
  const  navigate = useNavigate()
  const {register , handleSubmit , watch , setValue
    , control , getValues
  } = useForm({
    defaultValues : {
    title : post?.title||'' , 
    content : post?.content || '' , 
     status : post?.status|| '' , 
     slug : post?.slug|| '' 
}})
    const userData = useSelector((state)=>state.user.userData)
    const submit =  (data)=>{
      if(post){
         
      }else{

      }
    }
  return (
    <div>
      
    </div>
  )
}

export default Postform
