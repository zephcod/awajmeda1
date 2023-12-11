import { AwajUser } from '@/lib/validations/user';
import sdk from 'node-appwrite';

// Init SDK
const client = new sdk.Client();

const database = new sdk.Databases(client);
const users = new sdk.Users(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6504c902cef3dc9b138c') // Your project ID
    .setKey('66a4c4aeb8d537e0b321bb60ea2186afa775b941f6fec79e945b0531bb9133e0f9df4eaa56b943e40e2917f41604ab142be13650e114f457f65892cadfd6fc3c70eebdd1d5c52e7854c56aa6c7f5f5668a50f8f71e1ed9e4323e9e0d0c8c71f2933f9eed092374e8c599320bd85dc5a9851c8cb964ee52dc9fc1f53b1853c36f') // Your secret API key
;

export class AppwriteServerDBService {

  async getServerAwajUser ():Promise<AwajUser> {
    try {
    //   const user = await account.get()
    //   const uid = user.$id
      const data = await database.getDocument(
          '650a05f49ac5d9e273b8',
          '650a062ace779e21c647',
          "6519e191793cfad9a7d6"
      ) as unknown as AwajUser

      return data

    } catch (error) {
    console.log(error)
    return {} as unknown as AwajUser
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
          const user = await users.get('656a28d58f2a2edbf3cf')
          return user
        } catch (error) {
          console.log("Error getting user:"+error)
        }
        return null
      }

            // get preferences
      async getPreferences(){
        try {
          const prefs = await users.getPrefs('656a28d58f2a2edbf3cf')
          console.log(prefs)
          return prefs
        } catch (error) {
          console.log(error)
        }
      }

      // update preferences
      async updatePreferences(newcoin:number){
        try {
          const prefs = await users.updatePrefs('656a28d58f2a2edbf3cf',{coin:newcoin})
          console.log(prefs)
          return prefs
        } catch (error) {
          console.log(error)
        }
      }

}

const appwriteServerDBService = new AppwriteServerDBService

export default appwriteServerDBService

