import { MAX_FREE_COUNTs } from "@/lib/constants"
import appwriteServerDBService from "@/db/appwrite_server_db"

export const increaseApiLimit =async () => {
  
  const user = await appwriteServerDBService.getServerAwajUser()
  const userId = user.email

    if (!userId){
        return
    }

    const apiLimit = user.silverCoin

      if (apiLimit){
      }
      else{
        
      }
}
export const checkApiLimit = async () => {
  const user = await appwriteServerDBService.getServerAwajUser()
  const userId = user.email

    if (!userId) {
        return false
    }
    
    const apiLimit = user.silverCoin

    if (!apiLimit || apiLimit < MAX_FREE_COUNTs){
        return true
    }
    else{
        return false
    }
}

export const getApiLimit =async () => {
  const user = await appwriteServerDBService.getServerAwajUser()
  const userId = user.email
    
    if (!userId) {
        return 0
    }

    const apiLimit = user.silverCoin

    if (!apiLimit){
        return -8888
    }

    return apiLimit

}