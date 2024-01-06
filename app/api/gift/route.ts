import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit, giftCoins } from '@/lib/api-limit'
import { getTextImage } from "@/app/_actions/ai/text-image";

export async function POST(request: NextRequest) {
  const post = await request.json()
  const body = post.params
  const _gift = body.gift
  const _uid = body.des

  let id = ''
  if (_uid) {
    id = _uid 
  }

    const pref = {cost:Number(_gift), uid:id}
    console.log(body)

    const gift = await giftCoins(pref)
    let jsonRes = {
    status:'success',
    data:gift
    }
    console.log(jsonRes)
    return NextResponse.json(jsonRes)
}
