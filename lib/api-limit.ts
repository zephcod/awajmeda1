import { auth } from "@clerk/nextjs"
import { db } from "@/db"
import {  userApiLimit } from "@/db/schema"
import { eq } from "drizzle-orm"
import { MAX_FREE_COUNTs } from "@/constants"

export const increaseApiLimit =async () => {
    const { userId } = auth()

    if (!userId){
        return
    }

    const apiLimit = await db.query.userApiLimit.findFirst({
        where: eq(userApiLimit.clientid, userId),
      })

      if (apiLimit){
        await db
        .update(userApiLimit)
        .set({
          count: Number(apiLimit.count+1),
        })
        .where(eq(userApiLimit.clientid, userId))
      }
      else{
        await db.insert(userApiLimit).values({
            count: 1,
            clientid: userId
          })
      }
}

export const checkApiLimit = async () => {
    const {userId} = auth()

    if (!userId) {
        return false
    }
    
    const apiLimit = await db.query.userApiLimit.findFirst({
        where: eq(userApiLimit.clientid, userId),
      })
    
    if (!apiLimit || apiLimit.count < MAX_FREE_COUNTs){
        return true
    }
    else{
        return false
    }
}

export const getApiLimit =async () => {
    const {userId} = auth()
    
    if (!userId) {
        return 0
    }

    const apiLimit = await db.query.userApiLimit.findFirst({
        where: eq(userApiLimit.clientid, userId),
      })

    if (!apiLimit){
        return -8888
    }

    return apiLimit.count

}