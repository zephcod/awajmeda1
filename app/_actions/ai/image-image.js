const axios = require("axios");
const concat = require('concat-stream')

export const getImg2Img = async (data) => {

    
    console.log('reached here')
    let formData = new FormData();
    formData.append('init_image', data.image);
    formData.append('prompt', 'an astronaut riding a horse, digital art, highly-detailed masterpiece trending HQ');
    formData.append('strength', '0.9')
    
    formData.pipe(concat({encoding: 'buffer'}, buf => {
    
        const options = {
            method: 'POST',
            url: 'https://api.dezgo.com/image2image',
            headers: {
            'X-Dezgo-Key': 'DEZGO-B8406D63008CC915DC890825F155885D52E679A94E46F679835D9DFEF73AFE9C9ACC071A',
            ...formData.getHeaders()
            },
            data: buf,
            responseType: "arraybuffer"
        };



        axios.request(options).then(function (response) {
        
        let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
        imgsrc = base64ImageString
            return(base64ImageString)

        }).catch(function (error) {
            console.error("There was an error:", error);
            return([])
        });


}))
return (imgsrc)
}