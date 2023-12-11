import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import { getTextImage } from "@/app/_actions/ai/text-image";
import axios from "axios";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const _prompt = searchParams.get('prompt')
  const _model = searchParams.get('model')
  const _cost = searchParams.get('cost')

  const cost = Number(_cost)
  const sent = {prompt:_prompt, model:_model}

    const freeTrial = await checkApiLimit(cost)
    if (!freeTrial){
      return new NextResponse('Free trial has expired.', {status:403})
    }
    
    else{
      const res = await getTextImage(sent)
      let jsonRes = {
        status:'success',
        image:res
      }
        await decreaseCoins(cost)
        return NextResponse.json(jsonRes)
      }
}
