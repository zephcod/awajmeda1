import { absoluteUrl } from '@/lib/utils';
import {Client, Databases, Account, ID, AppwriteException} from 'appwrite'



  const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
          .setProject('6504c902cef3dc9b138c');

  export const database = new Databases(client);

  export const account = new Account(client);

  export class AppwriteAuthService {

    getNameFromEmail(email:string){
      return email.split('@')[0]
    }

    //create new user
    async createUserAccount({email, password, name}:any){
      try {
        const userAccount = await account.create(ID.unique(), email, password,name)
        if (userAccount) {
          const uid= userAccount.$id
          const userModel = {
            "email":email,
            "name":this.getNameFromEmail(email), 
            "profilePic":'', 
            "bio":'', 
            "newsletter":false}
            try {
              const res =  await database.createDocument(
                '650a05f49ac5d9e273b8',
                '650a062ace779e21c647',
                uid,
                userModel
              )
              console.log(res)
              return this.login({email, password})
          } catch (error) {
            console.log(error)
          }
        } else{
          return userAccount
        }
      } catch (error) {
        throw error
      }
    }

    // update phone number
    async updatePhone({phone, pass}:any){
      try {
        await account.updatePhone(phone,pass)
        const user = await account.get()
        const uid = user.$id
        await database.updateDocument(
          '650a05f49ac5d9e273b8',
          '650a062ace779e21c647',
          uid,
          {'phone':phone})
      } catch (error) {
        throw error
      }
    }

    //login user
    async login({email, password}:any){
      try {
        return await account.createEmailSession(email, password)
      } catch (error) {
        throw error
      }

    }

    //check if the user is logged in 
    async isLoggedIn():Promise<boolean> {
      try {
        const data = await this.currentUser()
        return Boolean(data)
      } catch (error) {
        
      }
      return false
    }

    //get information about current user
    async currentUser (){
      try {
        return account.get()
      } catch (error) {
        console.log("Error getting user:"+error)
      }
      return null
    }

    // get current session
    async getSession (){
      try {
        const session = await account.getSession('current')
        console.log(session)
      } catch (error) {
        console.log(error)
      }
    }

    // verify email
    async verifyEmail(){
      try {
        await account.createVerification('http://localhost:3000/dashboard/account')
      } catch (error) {
        console.log(error)
      }
    }
    
    // confirm verify email
    async confirmVerifyEmail(user:string, sec:string){
      try {
        await account.updateVerification(user, sec)
      } catch (error) {
        console.log(error)
      }
    }

    // verify phone
    async verifyPhone(){
      try {
        await account.createPhoneVerification()
      } catch (error) {
        console.log(error)
      }
    }
    
    // confirm verify phone
    async confirmVerifyPhone(sec:string){
      try {
        const user = await account.get()
        const uid = user.$id
        await account.updatePhoneVerification(uid, sec)
      } catch (error) {
        console.log(error)
      }
    }


    // get preferences
    async getPreferences(){
      try {
        const prefs = await account.getPrefs()
        return prefs
      } catch (error) {
        console.log(error)
      }
    }

    // update preferences
    async updatePreferences({}){
      try {
        const prefs = await account.updatePrefs({})
        return prefs
      } catch (error) {
        console.log(error)
      }
    }

    // reset password first factor
    async resetPasswordFirst({email}:any){
      const resetUrl = absoluteUrl("/signin/reset_password/step2");
      try {
        await account.createRecovery(email,resetUrl)
      } catch (error) {
        console.log(error)
      }
    }

    // reset password second factor
    async resetPasswordSecond(user:string, sec:string, password:string, password2:string){
      try {
        await account.updateRecovery(user,sec,password,password2)
      } catch (error) {
        console.log(error)
      }
    }
    
    //log out current user
    async logOut ():Promise<void>{
      try {
        await account.deleteSession('current')
      } catch (error) {
        console.log("logout error:"+error)
      }
      
    }
  }


const appwriteAuthService = new AppwriteAuthService

export default appwriteAuthService
