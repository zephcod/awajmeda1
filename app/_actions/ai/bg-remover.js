const axios = require("axios");
const concat = require('concat-stream')


export const getBgRemover = async (data) => {
  // console.log(data.prompt)
  // const encodedParams = new URLSearchParams();
  let formData = new FormData();
  const binary = Buffer.from(data.image, 'base64').toString('binary')
  let imgscr = ''

  
  formData.append('image', binary);
  // encodedParams.append("image", uint8Array);


  formData.pipe(concat({encoding: 'buffer'}, buf => {
  const options = {
    method: 'POST',
    url: 'https://api.dezgo.com/remove-background',
    // url: 'https://httpbin.org/post',
    headers: {
      // 'content-type': 'application/json',
      // 'content-type': 'application/x-www-form-urlencoded',
      'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
      ...formData.getHeaders()
    },
    data: buf,
    // data:{"image":data.image},
    responseType: "arraybuffer"
  };
  axios.request(options).then(function (response) {
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
}))

//   let imgsrc 
  // try {
  //   const result = await axios.request(options)
  //   // console.log(result)
  //   const base64ImageString = Buffer.from(result.data, 'binary').toString('base64')
  //   return(base64ImageString)
  // } catch (error) {
  //   console.error("There was an error:",error);
  //   return([])
    
  // }


}