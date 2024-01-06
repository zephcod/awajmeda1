const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const concat = require("concat-stream")
import React from 'react';
import SD2_1 from '@/public/gallery/models/SD-2-1.png'


export async function POST(request) {
const data = new FormData();

data.append("prompt", "Stunning portrait of a young woman, snowy background, digital art, highly-detailed masterpiece trending HQ");
data.append("init_image", fs.createReadStream('public/gallery/models/SD-2-1.png'));
data.append("strength", "0.3")
// data.append("seed", "2942950965")

data.pipe(concat({encoding: 'buffer'},  async buf => {

    const options = {
        method: 'POST',
        url: 'https://api.dezgo.com/image2image',
        headers: {
            'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
            ...data.getHeaders()
          },
        data: buf,
        responseType: "arraybuffer"
    };

    axios.request(options).then(async function (response) {

        console.log("Success! Writing output file...")
        res.status(response.status).set("Content-Type", "image/png").send(response.data);
        return(imgsrc)

    }).catch(function (error) {
        console.error("There was an error:", error);
    });

}))
}