import appwriteServerDBService from "@/db/appwrite_server_db"

export const decreaseCoins =async (cost:number) => {
  
  const user = await appwriteServerDBService.currentUser()

    if (!user){
        return
    }
    const prefs = await appwriteServerDBService.getPreferences() as any
    const coin = prefs?.coin

    
      if (coin){
        await appwriteServerDBService.updatePreferences(coin-cost)
      }
      else{
        return
      }
}
export const checkApiLimit = async (cost:number) => {
  const prefs = await appwriteServerDBService.getPreferences() as any
  const coin = Number(prefs?.coin)


    if (coin && coin>cost){
        return true
    }
    else{
        return false
    }
}

