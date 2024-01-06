import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import Configuration, { OpenAI } from "openai";
import axios from "axios";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


export async function POST(request: Request) {

    const {searchParams} = new URL(request.url)
    
    const body = await request.json()
    const prompt = body.params.prompt ||''
    const _model = searchParams.get('model')
    const _cost = searchParams.get('cost')
    const _uid = body.params.des
  
    let id = ''
    if (_uid) {
      id = _uid 
    }
  
try{
    const pref = {cost:Number(_cost), uid:id}
    const sent = {prompt:prompt, model:_model}
  
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

          await decreaseCoins(pref)
          console.log(res.data[0])
          const url = res.data[0].url

          if (url) {
            try {
              const image = axios.get(url,{responseType:'arraybuffer'})
              const base64ImageString = Buffer.from((await image).data, 'binary').toString('base64')

              let jsonRes = {
                status:'success',
                image:base64ImageString
              }
              
              return NextResponse.json(jsonRes);
            } catch (error) {
              console.log(error)
              return new NextResponse('Image not generated', {status:400})
            }
          }
        }

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
