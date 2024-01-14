import Juggernaut from '@/public/gallery/models/juggernaut.png'
import Dreamshaper from '@/public/gallery/models/dreamshaperXL.png'
import SDXL from '@/public/gallery/models/SDXL.png'
import Tshirt from '@/public/gallery/models/t-shirt-XL.png'
import Dalle from '@/public/gallery/models/dalle.png'
import Absolute_1_8 from '@/public/gallery/models/absolute-1-8.png'
import Cyber from '@/public/gallery/models/cyber.png'
import Icibn from '@/public/gallery/models/icbinp-realistic.png'
import Dream from '@/public/gallery/models/dreamshaper.png'
import Raw2 from '@/public/gallery/models/raw-photo-2.png'
import SD2_0 from '@/public/gallery/models/SD-2-0.png'
import SD2_1 from '@/public/gallery/models/SD-2-1.png'
import Edges from '@/public/gallery/models/edges.jpg'
import Scribble from '@/public/gallery/models/drawing.jpg'
import Straight from '@/public/gallery/models/scribble.jpg'
import Depth from '@/public/gallery/models/depth.jpg'
import NormalMap from '@/public/gallery/models/normalmap.jpg'
import LineArt from '@/public/gallery/models/lineart.jpg'
import Pose from '@/public/gallery/models/pose.jpg'


export const xlModels: {id:string; title: string; image: string; desc: string;}[] = [
    {
        title: 'Dall-e 3',
        id:'dall-e-3',
        image: Dalle.src,
        desc: 'DALL-E 3 is an advanced generative model by OpenAI, capable diverse, imaginative and reliable images generation.',
    },
    {
        title: 'Dreamshaper XL',
        id:'dreamshaperxl_1024px',
        image: Dreamshaper.src,
        desc: 'Dreamshaper XL is an advanced generative model by Lykon, capable of diverse and un-restricted image generations.',
    },
    {
        title: 'Juggernaut XL',
        id:'juggernautxl_1024px',
        image: Juggernaut.src,
        desc: 'Juggernaut XL is a recent addition to advanced image generation by KandooAI, capable of producing realistic images.',
    },
    {
        title: 'Stable Diffusion XL',
        id:'sdxl_1024px',
        image: SDXL.src,
        desc: 'Stable Diffusion XL is the latest realease from the open-source StabilityAI with a wide range of image generations.',
    },
    {
        title: 'T-shirt Designer XL',
        id:'tshirtdesignredmond_1024px',
        image: Tshirt.src,
        desc: 'T-shirt Designer XL is a specialized model by artificialguybr particularly trained for generating t-shirt designs.',
    },
]

export const inpaintModels: {id:string; title: string; image: string; desc: string;}[] = [
    {
        title: 'Absoulute Reality 1.8',
        id:'absolute_reality_1_8_1_inpaint',
        image: Absolute_1_8.src,
        desc: '',
    },
    {
        title: 'Cyber Realistic 3.3',
        id:'cyberrealistic_3_3_inpaint',
        image: Cyber.src,
        desc: '',
    },
    {
        title: 'Dreamshaper 8.0',
        id:'dreamshaper_8_inpaint',
        image: Dream.src,
        desc: '',
    },
    {
        title: 'Icbin Realistic',
        id:'icbinp_seco_inpaint',
        image: Icibn.src,
        desc: '',
    },
    {
        title: 'Realistic Vision 5.1',
        id:'realistic_vision_5_1_inpaint',
        image: Raw2.src,
        desc: '',
    },
    {
        title: 'Stable Diffusion 1.0',
        id:'stablediffusion_inpaint_1',
        image: SD2_0.src,
        desc: '',
    },
    {
        title: 'Stable Diffusion 2.0',
        id:'stablediffusion_inpaint_2',
        image: SD2_1.src,
        desc: '',
    },
]

export const controlModels: {id:string; title: string; image: string; desc: string;}[] = [
    {
        title: 'Canny Edges',
        id:'canny',
        image: Edges.src,
        desc: '',
    },
    {
        title: 'Depth Map',
        id:'depth',
        image: Depth.src,
        desc: '',
    },
    {
        title: 'Normal Map',
        id:'normalbae',
        image: NormalMap.src,
        desc: '',
    },
    {
        title: 'Line Art',
        id:'lineart',
        image: LineArt.src,
        desc: '',
    },
    {
        title: 'Straight Lines',
        id:'mlsd',
        image: Straight.src,
        desc: '',
    },
    {
        title: 'Open Pose',
        id:'openpose_full',
        image: Pose.src,
        desc: '',
    },
    {
        title: 'Scribble',
        id:'scribble',
        image: Scribble.src,
        desc: '',
    },
]