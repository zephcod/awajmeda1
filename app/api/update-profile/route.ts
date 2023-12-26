import appwriteServerDBService from "@/db/appwrite_server_db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const des = searchParams.get('des') || '0'
    const imgId = searchParams.get('img') || ''
    const coin = Number(searchParams.get('c') || 10)

    const upref = {proPic:imgId,uid:des,coin:coin}

    await appwriteServerDBService.updatePreferences(upref)
  
    return new NextResponse('Success', {status:200})
    
}