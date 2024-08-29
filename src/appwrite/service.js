import conf from "../conf/conf.js";
import { Client , Account , ID , Databases , Storage , Query } from "appwrite";
export class Service{
   client = new Client()
   databases 
   bucket 
   constructor(){
    this.client.setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwrite_project_id)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)

   }
   async createPost({title , slug , content , featuredImage , status , userId}){
      try {
        return await this.databases.createDocument(
            conf.appwrite_database_id , 
            conf.appwrite_collection_id , 
            slug , 
            {
                title , 
                content, 
                featuredImage ,
                status, 
                userId
            }
        )
      } catch (error) {
        console.log("Appwrite error :: createPost ::" , error)
      }
   }
   async  updatePost(slug , {title , content , featuredImage , status}){
      try {
        return await this.databases.updateDocument(
            conf.appwrite_database_id , 
            conf.appwrite_collection_id , 
            slug , 
            {
                title , 
                content , 
                featuredImage , 
                status , 
            }

        )
      } catch (error) {
        console.log("Appwrite error :: updatePost ::" , error)
      }
   }
   async deleteDocument(slug){
     try {
        await  this.databases.deleteDocument(
            conf.appwrite_database_id , 
            conf.appwrite_collection_id , 
            slug 
        )
        return true 
     } catch (error) {
        console.log("Appwrite error :: deletePost :: erorr " , error)
        return false 
     }
   }
   async getPost(slug){
      try {
        return await this.databases.getDocument(
            conf.appwrite_database_id  ,
            conf.appwrite_collection_id , 
            slug 
        )
      } catch (error) {
        console.log("Appwrite error :: getPost :: error" , error)
        return false 
      }
   }
   async getPosts(queries = [Query.equal("status" , "active")]){
     try {
        return await this.databases.listDocuments(
            conf.appwrite_database_id , 
            conf.appwrite_collection_id , 
            queries 
        )
     } catch (error) {
        console.log("Appwrite error :: getPosts :: error " , error)
        return false 
     }
   }

   //////////////file upload ////////////////

async uploadFile(file){
  
 try {
     return await this.bucket.createFile(
       conf.appwrite_bucket_id , 
       ID.unique() , 
       file 
     )
 } catch (error) {
    console.log("Appwrite error :: uploadFile ::" , error)
    return false
 }
}
async deleteFile(fileId){
   try {
     await this.bucket.deleteFile(
        conf.appwrite_bucket_id  , 
      fileId 
    )
    return true 
   } catch (error) {
    console.log("Appwrite error :: deleteFile ::" , error)
    return false 
   }
}
 getFilePreview(fileId){
  try {
    console.log(this.bucket.getFilePreview(
      conf.appwrite_bucket_id , 
      fileId
    ))
    
    return  this.bucket.getFilePreview(
      conf.appwrite_bucket_id , 
      fileId
    )
  } catch (error) {
    console.log("Appwrite error :: getFilePreview :: error " , error)
  }
}
}
const service = new Service()
export default service 