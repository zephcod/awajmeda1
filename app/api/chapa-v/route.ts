'use server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import appwriteServerDBService from "@/db/appwrite_server_db";
import { Chapa } from "chapa-nodejs";

const chapa = new Chapa({
    secretKey: "CHASECK_TEST-BHcbAIPojwydRGTqJTwUfbgqL8pRCCrm",
  });

export async function GET() {
    
    try {
        const refId = cookies().get("refId")!.value
        const desId = cookies().get ("desId")!.value
        let chapaSession = await chapa.verify({tx_ref:refId})
        if (chapaSession.status) {
            const refill = Number(chapaSession.data.amount)*10

            const user = await appwriteServerDBService.currentUser(desId)
            if (!user){
                return
            }
            if (user) {
              const uid=user!.$id

              const prefs = await appwriteServerDBService.getPreferences(uid) as any
              const coin = Number(prefs?.coin)
          
              
                if (coin){
                  const renew=coin+refill
                  await appwriteServerDBService.updatePreferences({uid,renew})
                }
                else{
                  return
                }
            }

        }
        return new NextResponse(JSON.stringify({ url: chapaSession.data }))

    } catch (error) {
        console.log('chapa error',error)
        return new NextResponse('Internal error',{status:500})
    }
}