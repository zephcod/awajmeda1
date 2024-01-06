import { NextRequest, NextResponse } from "next/server";
import { decreaseCoins, checkApiLimit } from '@/lib/api-limit'
import fs from "fs";
import axios from "axios";
// import * as intoStream from 'into-stream';
const multer = require('multer');

export async function POST(req,res) {
  const upload = multer();
  const post = await req.json()
  const body = post.params
  const _cost = body.cost
  const _uid = body.des
  // const imageString = intoStream(body.image).pipe(process.stdout);
  // const imageString = upload.single(body.image)
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
      const data = new FormData();
      const base64Image = body.image.split(';base64,').pop();
      const base64WithoutPrefix = body.image.replace(/^data:image\/[a-z]+;base64,/, '');
          // Decode base64 string
          const decodedData = atob(base64WithoutPrefix);
          // Create a Uint8Array from the decoded data
          const uint8Array = new Uint8Array(decodedData.length);
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
          const blob = new Blob([uint8Array], { type: 'image/png' });
          const regg = new Response(blob, {
            status: 200,
            statusText: "OK",
            headers: {
              "Content-Type": "image/png",
              "Content-Length": blob.size
            },
          });

         // Create a File from the Blob
          // const file = new File([blob], 'image.png', { type: 'image/png' });

      // data.append("image", imageString);
      // const imageBuffer = Buffer.from(decodedData, 'base64');
      // const fullu = fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
      //   console.log('File created');});
      // data.append("image", fs.createReadStream('public/gallery/models/dreamshaper.png'));
      data.append("image", uint8Array);
      // data.append("image", fs.createWriteStream([blob], 'image.png', { type: 'image/png' }));

      const options = {
          method: 'POST',
          url: 'https://api.dezgo.com/remove-background',
          headers: {
              'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
              ...data.getHeaders()
            },
          data: data,
          responseType: "arraybuffer"
        };

      let imgsrc 
      console.log(options.data)
      await axios.request(options).then(response => {
          let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
          imgsrc=base64ImageString

      }).catch(function (error) {
          console.error("There was an error:", error);
      });

        await decreaseCoins(pref)
        return NextResponse.json(imgsrc)
      }
}
