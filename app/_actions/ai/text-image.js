const axios = require("axios");



export const getTextImage = async (data) => {
// console.log(data.prompt)

  const encodedParams = new URLSearchParams();
  encodedParams.append("prompt", data.prompt);
  encodedParams.append("negative_prompt", "ugly, poorly drawn, deformed, deformed limbs");
  encodedParams.append("guidance", "8");
  encodedParams.append("seed", "568542368");
  //Use this to select which model to use:
  encodedParams.append("model", "absolute_reality_1_8_1");
  
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

  let imgsrc = ''

await axios.request(options).then(function (response) {
  
  let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
  imgsrc = base64ImageString
  // console.log(base64ImageString)
    return(base64ImageString)

}).catch(function (error) {
    console.error("There was an error:", error);
    return([])
});
return (imgsrc)
}