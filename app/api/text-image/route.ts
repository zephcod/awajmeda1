import { NextRequest, NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

export async function GET(request: NextRequest) {

    const freeTrial = await checkApiLimit()

    if (!freeTrial){
      return new NextResponse('Free trial has expired.', {status:403})
    }
    
    else{
      let json_response = {'Image':'generated'};

        await increaseApiLimit()
        return NextResponse.json(json_response);
      }
}