import appwriteServerDBService from "@/db/appwrite_server_db"

export const decreaseCoins =async (pref:{cost:number,uid:string}) => {
  
  const user = await appwriteServerDBService.currentUser(pref.uid)

    if (!user){
        return
    }
    const prefs = await appwriteServerDBService.getPreferences(pref.uid) as any
    const coin = prefs?.coin
    const img = prefs?.propic as unknown as string

    
      if (coin){
        const _renew = coin-pref.cost
        const upref = {proPic:img, uid:pref.uid, coin:_renew}
        await appwriteServerDBService.updatePreferences(upref)
      }
      else{
        return
      }
}

export const giftCoins =async (pref:{cost:number,uid:string}) => {
  
  const user = await appwriteServerDBService.currentUser(pref.uid)

    if (!user){
        return
    }
    const prefs = await appwriteServerDBService.getPreferences(pref.uid) as any
    const coin = prefs?.coin
    const img = prefs?.propic as unknown as string

    
      if (coin){
        return (false)
      }
      else{
        const _renew = pref.cost
        const upref = {proPic:img, uid:pref.uid, coin:_renew}
        await appwriteServerDBService.updatePreferences(upref)
        return(true)
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

