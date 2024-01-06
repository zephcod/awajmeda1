import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import Configuration, { OpenAI } from "openai";


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAI();


export async function POST(request: Request) {
    
    const {searchParams} = new URL(request.url)
    const body = await request.json()
    const prompt = body.params.prompt ||''
    const _model = searchParams.get('model')
    const _cost = searchParams.get('cost')
    const _uid = body.params.des


    const payload = {
                "model":"dall-e-3",
                "prompt": prompt,
                "n": 1,
                "size": "512x512"
    }

    console.log(body)
  
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
        const res = await fetch ("https://api.openai.com/v1/images/generations",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
            },
            method:"POST",
            body:JSON.stringify(payload)
        })


        let jsonRes = {
          status:'success',
          image:res
        }
          await decreaseCoins(pref)
          console.log(res)
          return NextResponse.json(res);
        }

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
