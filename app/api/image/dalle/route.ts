import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


export async function POST(request: Request) {
    const body = await request.json()
    const prompt = body.params.prompt ||''
    const _cost = body.params.cost
    const _uid = body.params.des
  
    let id = ''
    if (_uid) {
      id = _uid 
    }
  
try{
    const pref = {cost:Number(_cost), uid:id}
  
      const freeTrial = await checkApiLimit(pref)
      if (!freeTrial){
        return new NextResponse('Free trial has expired.', {status:403})
      }
      
      else{
        console.log(prompt)
        const res = await openai.images.generate({
            model:"dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
          });
          console.log(res)
          const url = res.data[0].url
          
          if (url) {
            try {
              // await decreaseCoins(pref)
              const image = await axios.get(url,{responseType:'arraybuffer'})
              const base64ImageString = Buffer.from((image).data, 'binary').toString('base64')

              let jsonRes = {
                status:'success',
                image:base64ImageString
              }
              
              return NextResponse.json(jsonRes);
            } catch (error) {
              console.log(error)
              return new NextResponse('Image not generated', {status:400})
            }
          } else{
            return new NextResponse('Image can not be generated', {status:407})
          }

        }

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
