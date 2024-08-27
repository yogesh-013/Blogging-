import conf from "../conf/conf.js";
import {Client , Account , ID} from "appwrite"
export class AuthService{
    client = new Client() ; 
    account 
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwrite_project_id)
        this.account = new Account(this.client)
    }
    async createAccount(email , password , username){
       try {
        const userAccount =  await this.account.create(ID.unique , email , password , username)
        if(userAccount){
            return this.loginUser(email , password)
        }else{
            return null 
        }
       } catch (error) {
        throw error 
       }
    }
    
    async loginUser(email , password){
        try {
            const loggedInUser = await this.account.createEmailPasswordSession(email , password)
            if(loggedInUser){
                return loggedInUser 
            }else{
                return null 
            }
        } catch (error) {
            throw error  
            
        }
    }
    async getCurrentUser(){
       try {
        const getAccount =  await this.account.get() 
        if(getAccount){
            return getAccount 
        }
       } catch (error) {
        console.log("Error in get Current User in Appwrite" , error)
        return null 
       }
     
    }
    async logout(){
        try {
            await this.account.deleteSessions()
            return true 
        } catch (error) {
            console.log("Appwrite service :: logout :: error" , error)
            throw error 
        }
    }
}
const authService = new AuthService() 
export default authService