import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import { getTextImage } from "@/app/_actions/ai/text-image";
import axios from "axios";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const _prompt = searchParams.get('prompt')
  const _model = searchParams.get('model')
  const _cost = searchParams.get('cost')
  const _uid = searchParams.get('des')

  let id = ''
  if (_uid) {
    id = _uid 
  }

  const pref = {cost:Number(_cost), uid:id}
  const sent = {prompt:_prompt, model:_model}

    const freeTrial = await checkApiLimit(pref)
    if (!freeTrial){
      return new NextResponse('Free trial has expired.', {status:403})
    }
    
    else{
      const res = await getTextImage(sent)
      let jsonRes = {
        status:'success',
        image:res
      }
        await decreaseCoins(pref)
        return NextResponse.json(jsonRes)
      }
}
