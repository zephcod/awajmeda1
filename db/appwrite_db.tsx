'use client'
import {Client, Databases, Account, ID, AppwriteException, Query} from 'appwrite'
import { Solution } from '@/lib/validations/solution';
import { Models } from 'appwrite';
import { AwajUser } from '@/lib/validations/user';
import { AwajFeedback } from '@/lib/validations/feedback';
import { AwajGallery } from '@/lib/validations/gallery';



  const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
          .setProject('6504c902cef3dc9b138c');

  export const database = new Databases(client);

  export const account = new Account(client);


  export class AppwriteDBService {
    
    // get solutions list
    async getSol ():Promise<Solution[]> {
        try {
        const data = await database.listDocuments(
            '650a05f49ac5d9e273b8',
            '650c8281e11da97327c9'
        ) 
        const res = data.documents as unknown as Solution[]
            return res
        } catch (error) {
        console.log(error)
        return {} as Solution[]
        }
    }

    // get user profile data
    // async getUser ():Promise<AwajUser> {
    //     try {
    //       const user = await account.get()
    //       const uid = user.$id
    //       const data = await database.getDocument(
    //           '650a05f49ac5d9e273b8',
    //           '650a062ace779e21c647',
    //           uid
    //       ) as unknown as AwajUser

    //       return data

    //     } catch (error) {
    //     console.log(error)
    //     return {} as unknown as AwajUser
    //     }
    // }

    // update user profile data
    async updateUser (currentUser:AwajUser):Promise<AwajUser> {
        try {
          const user = await account.get()
          const uid = user.$id
          const data = await database.updateDocument(
              '650a05f49ac5d9e273b8',
              '650a062ace779e21c647',
              uid,
              {'name':currentUser.name}
          ) as unknown as AwajUser

          return data

        } catch (error) {
        console.log(error)
        return {} as unknown as AwajUser
        }
    }

        // send feedback
        async sendFeedback (data:AwajFeedback) {
          try {
            const feedback = await database.createDocument(
                '650a05f49ac5d9e273b8',
                '657ee48c846bfbcfef5c',
                ID.unique(),
                data
            ) as unknown as AwajFeedback
  
            return feedback
  
          } catch (error) {
          console.log(error)
          }
      }

          // record new gallery item
          async newGalleryItem (data:AwajGallery) {
            try {
              const feedback = await database.createDocument(
                  '650a05f49ac5d9e273b8',
                  '6584adab586c993ce254',
                  ID.unique(),
                  data
              ) as unknown as AwajFeedback
    
              return feedback
    
            } catch (error) {
            console.log(error)
            }
        }

              // get gallery item
              async getGalleryItem (uid:string) {
                try {
                  const gallery = await database.listDocuments(
                    '650a05f49ac5d9e273b8',
                    '6584adab586c993ce254',
                    [
                      Query.equal('user',uid)
                    ]
                    ) as unknown as {documents:[AwajGallery],total:number}
                    
                  console.log(gallery)
                  return gallery
        
                } catch (error) {
                console.log(error)
                }
            }
  } 

  const appwriteDBService = new AppwriteDBService

export default appwriteDBService