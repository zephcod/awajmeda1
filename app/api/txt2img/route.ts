import { NextRequest, NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

export async function GET(request: NextRequest) {
  
      return new NextResponse('Free trial has expired.', {status:403})
    
}