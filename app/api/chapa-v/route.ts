'use server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import { emailPreferences } from "@/db/schema"
import { db }from '@/db';
import { awajChapa } from "@/lib/chapa";



export async function GET() {
    
    try {
        const refId = cookies().get("refId")?.value
        let chapaSession = await awajChapa.verify(refId)
        // console.log(JSON.stringify(chapaSession.data.tx_ref))
        await db.insert(emailPreferences).values({
            email: 'grta@gm.com',
            token: JSON.stringify(chapaSession.data.tx_ref),
            clientid: 'tiret',
            newsletter: true,
          })
        return new NextResponse(JSON.stringify({ url: chapaSession.data }))

    } catch (error) {
        console.log('chapa error',error)
        return new NextResponse('Internal error',{status:500})
    }
}