import axios from "axios"

export async function POST(req,res) {
    const post = await req.json()
    const body = post.params
    const base64Image = body.image.split(';base64,').pop();

    const options = {
        method: 'POST',
        url: 'https://api.dezgo.com/remove-background',
        headers: {
          'content-type': 'application/json',
          'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
        },
        data: {"image": base64Image,},
        responseType: "arraybuffer"
      };
      const response = await axios.request(options)
   
    const base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
    return Response.json(base64ImageString)
  }