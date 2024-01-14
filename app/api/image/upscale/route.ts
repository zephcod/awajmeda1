import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import axios from "axios";

export async function POST(request: NextRequest) {
  const post = await request.json()
  const body = post.params
  const base64Image = body.image.split(';base64,').pop();
  const _cost = body.cost
  const _uid = body.des

  let id = ''
  if (_uid) {
    id = _uid 
  }

  const pref = {cost:Number(_cost), uid:id}

    const freeTrial = await checkApiLimit(pref)
    if (!freeTrial){
      return new NextResponse('Free trial has expired.', {status:403})
    }
    
    else{
        const options = {
            method: 'POST',
            url: 'https://api.dezgo.com/upscale',
            headers: {
              'content-type': 'application/json',
              'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
            },
            data: { 
                  "image": base64Image,
                },
            responseType: "arraybuffer"
          };
          const response = await axios.request(options)
       
        const base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
        await decreaseCoins(pref)
        return Response.json(base64ImageString)
      }
}
