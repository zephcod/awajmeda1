import appwriteServerDBService from "@/db/appwrite_server_db"

export const decreaseCoins =async (pref:{cost:number,uid:string}) => {
  
  const user = await appwriteServerDBService.currentUser(pref.uid)

    if (!user){
        return
    }
    const prefs = await appwriteServerDBService.getPreferences(pref.uid) as any
    const coin = prefs?.coin

    
      if (coin){
        const _renew = coin-pref.cost
        const upref = {renew:_renew,uid:pref.uid}
        await appwriteServerDBService.updatePreferences(upref)
      }
      else{
        return
      }
}
export const checkApiLimit = async (pref:{cost:number,uid:string}) => {
  const prefs = await appwriteServerDBService.getPreferences(pref.uid) as any
  const coin = Number(prefs?.coin)


    if (coin && coin>pref.cost){
        return true
    }
    else{
        return false
    }
}

