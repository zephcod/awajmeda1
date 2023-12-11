'use server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import { awajChapa } from "@/lib/chapa";
import appwriteServerDBService from "@/db/appwrite_server_db";



export async function GET() {
    
    try {
        const refId = cookies().get("refId")?.value
        let chapaSession = await awajChapa.verify(refId)
        if (chapaSession.status) {
            const refill = Number(chapaSession.data.amount)*10

            const user = await appwriteServerDBService.currentUser()
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
        // console.log(JSON.stringify(chapaSession.data))
        // await db.insert(emailPreferences).values({
        //     email: 'grta@gm.com',
        //     token: JSON.stringify(chapaSession.data.tx_ref),
        //     clientid: 'tiret',
        //     newsletter: true,
        //   })
        return new NextResponse(JSON.stringify({ url: chapaSession.data }))

    } catch (error) {
        console.log('chapa error',error)
        return new NextResponse('Internal error',{status:500})
    }
}