const axios = require("axios");


export const getTextImage = async (data) => {
  console.log(data.prompt)
  const encodedParams = new URLSearchParams();
  encodedParams.append("prompt", data.prompt);
  encodedParams.append("guidance", data.guidance);
  encodedParams.append("height", data.height);
  encodedParams.append("width", data.width);
  encodedParams.append("model", data.model);
  
  if (data.seed) {
    encodedParams.append("seed", data.seed);
  }
  if (data.negative) {
    encodedParams.append("negative_prompt", data.negative);
  } else {
    encodedParams.append("negative_prompt", 'ugly, poorly drawn, deformed, deformed limbs');
  }
  
  
  const options = {
    method: 'POST',
    url: 'https://api.dezgo.com/text2image',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
    },
    data: encodedParams,
    responseType: "arraybuffer"
  };

  let imgsrc 

await axios.request(options).then(function (response) {
  // const data = response.data
  // console.log(data)
  
  let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
  imgsrc = base64ImageString
    return(base64ImageString)

}).catch(function (error) {
    console.error("There was an error:", error);
    return([])
});
return (imgsrc)
}