import React, { useCallback, useState } from 'react'
import { Input , Button , Select , RTE} from '../index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../appwrite/service.js'
import authService from '../../appwrite/auth.js'
import { useForm } from 'react-hook-form'
function Postform({post}) {
  const  navigate = useNavigate()
  const [error , setError] = useState("")
  const {register , handleSubmit , watch , setValue
    , control , getValues , 
    formState: { isSubmitting }
  } = useForm({
    defaultValues : {
    title : post?.title||'' , 
    content : post?.content || '' , 
     status : post?.status|| 'active' , 
     slug : post?.slug|| '' 
}})
    const userData = useSelector(state=>state.auth.userData)
    const statuss = useSelector(state => state.auth.status)
    const submit =  async (data)=>{
      setError("")
      try {

      if(post){
  
         const file =  await data.image[0]? service.uploadFile(data.image[0]) : null 
         if(file){
          service.deleteFile(post.featuredImage)
         }
         const dbPost =await  service.updatePost(post.$id , 
          { ...data , 
            featuredImage : file?file.$id : undefined   
  
          }
         )
         if(dbPost){
          navigate(`/post/${dbPost.$id}`)
         }
        }else{
         
          const m = await authService.getCurrentUser()
          console.log(m);
          
          
          
          console.log(userData);
          console.log(statuss);
          
          const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
  
        }
    } catch (error) {
      console.log(error);
      
      setError(error.message)
    }
    }
    const slugTransform = useCallback((value)=>{
if(value && typeof value === 'string'){
  return value.trim().toLowerCase().replace(/\s/g, '-')

}
return ''
    },[])
    React.useEffect(()=>{
      const subscription = watch((value , {name}) =>{
        if(name === 'title'){
          setValue('slug' , slugTransform(value.title))
        }
      })
return ()=>{
  subscription.unsubscribe()
}
    } , [watch , slugTransform , setValue ])
  return (
   
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
       {isSubmitting ? ( <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
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
  </div>):(
      <>
        <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content : " name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required : !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div></>
       )}
  
</form>
  )
}

export default Postform
