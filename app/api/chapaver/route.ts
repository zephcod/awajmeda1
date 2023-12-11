'use server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import { awajChapa } from "@/lib/chapa";
import appwriteServerDBService from "@/db/appwrite_server_db";
import { Chapa } from "chapa-nodejs";

const chapa = new Chapa({
    secretKey: "CHASECK_TEST-BHcbAIPojwydRGTqJTwUfbgqL8pRCCrm",
  });

export async function GET() {
    try {
        const chapaSession = await chapa.verify({tx_ref:'TX-UCKK2C86PZLVZLZ'})
        console.log(chapaSession)
        return new NextResponse(JSON.stringify(chapaSession))
    } catch (error) {
        return new NextResponse('Internal error',{status:500})
    }
}