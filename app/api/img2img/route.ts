import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import { getTextImage } from "@/app/_actions/ai/text-image";
import axios from "axios";
import { getImg2Img } from "@/app/_actions/ai/image-image";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const _image = searchParams.get('image')
  const _model = searchParams.get('model')
  const _cost = searchParams.get('cost')
  const _uid = searchParams.get('des')

  let id = ''
  if (_uid) {
    id = _uid 
  }

  const pref = {cost:Number(_cost), uid:id}
  const sent = {image:_image, model:_model}

    const freeTrial = await checkApiLimit(pref)
    if (!freeTrial){
      return new NextResponse('Free trial has expired.', {status:403})
    }
    
    else{
      console.log('boom')
      const res = await getImg2Img(sent)
      let jsonRes = {
        status:'success',
        image:res
      }
        await decreaseCoins(pref)
        return NextResponse.json(jsonRes)
      }
}
