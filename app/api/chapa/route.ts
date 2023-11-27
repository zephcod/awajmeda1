'use server'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import appwriteServerDBService from '@/db/appwrite_server_db'

import { awajChapa } from "@/lib/chapa";
import { absoluteUrl } from "@/lib/utils";

const billingsUrl = absoluteUrl("/pricing");
const verifyUrl = absoluteUrl("/chapa-v");


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const amount = searchParams.get('amount')
    const prod = searchParams.get('prod')
    
  

try {
    'use server'
    const user = await appwriteServerDBService.getServerAwajUser()
    
    if (!user ) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
        const customerInfo =  {
            amount: amount,
            currency: 'ETB',
            email: user!.email,
            first_name: `user${user!.name}`,
            last_name: prod,
            // tx_ref: 'tx-x12345', // if autoRef is set in the options we dont't need to provide reference, instead it will generate it for us
            callback_url: verifyUrl, // your callback URL
            return_url: billingsUrl,
            meta: {
                product:"silver mela"
            },
            customization: {
                title: 'Awaj AI',
                description: 'from ace digital plc'
                }
        }
        
        let chapaSession = await awajChapa.initialize(customerInfo, { autoRef: true })
        
        const cookieStore = cookies()
        cookieStore.set("refId", String(chapaSession.tx_ref))

        return new NextResponse(JSON.stringify({ url: chapaSession.data.checkout_url }))

    } catch (error) {
        console.log('chapa error',error)
        return new NextResponse('Internal error',{status:500})
    }
}