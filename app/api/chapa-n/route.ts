import { Chapa } from 'chapa-nodejs';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import appwriteServerDBService from '@/db/appwrite_server_db'


const billingsUrl = "https://meda.awajai.com/dashboard/coins";
const verifyUrl = "https://meda.awajai.com/api/chapa-v";
const chapa = new Chapa({
  secretKey: "CHASECK_TEST-BHcbAIPojwydRGTqJTwUfbgqL8pRCCrm",
});

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const amount = searchParams.get('amount') || '0'
    const prod = searchParams.get('prod')
    const uid = searchParams.get('des')
    const name = searchParams.get('name') || ''
    const email = searchParams.get('email') || ''
    
    const tx_ref = await chapa.generateTransactionReference(); 

     try {
        'use server'
        console.log('we here')
        console.log(amount)
        // const user = await appwriteServerDBService.getServerAwajUser()
        
       
        if (!uid ) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const customerInfo =  {
            amount: amount,
            currency: 'ETB',
            email: email,
            first_name: name,
            last_name: `i-${prod}`,
            tx_ref: tx_ref,
            callback_url: verifyUrl, // your callback URL
            return_url: billingsUrl,
            meta: {
                product:"silver mela"
            },
            customization: {
                title: 'Awaj AI',
                description: 'From Awaj AI Ace Digital PLC'
                }
        }
        console.log(JSON.stringify(customerInfo))
        
        let chapaSession = await chapa.initialize(customerInfo, )
        console.log(JSON.stringify(chapaSession))

        const cookieStore = cookies()
        cookieStore.set("refId", String(customerInfo.tx_ref))
        cookieStore.set("desId", String(uid))

        return new NextResponse(JSON.stringify({ url: chapaSession.data.checkout_url }))

    } catch (error) {
        console.log('chapa error',error)
        return new NextResponse('Internal error',{status:500})
    }
}