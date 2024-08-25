const conf = {
    appwriteUrl  : String(import.meta.env.APPWRITE_URL) , 
    appwrite_project_id : String(import.meta.env.APPWRITE_PROJECT_ID) , 
    appwrite_database_id : String(import.meta.env.APPWRITE_DATABASE_ID) , 
    appwrite_collection_id : String(import.meta.env.APPWRITE_COLLECTION_ID),
    appwrite_bucket_id : String(import.meta.env.APPWRITE_STORAGE_ID) 
    
}
export default conf 
