import Sketch from '@/public/gallery/pre-conf/sketch.png'
import Cartoon from '@/public/gallery/pre-conf/cartoon.png'
import Beauty from '@/public/gallery/pre-conf/beautify.png'
import Faceswap from '@/public/gallery/pre-conf/faceswap.png'
import Post from '@/public/gallery/pre-conf/post.png'
import Web from '@/public/gallery/pre-conf/website.png'
import Arch from '@/public/gallery/pre-conf/architecture.png'
import Interior from '@/public/gallery/pre-conf/interior.png'
import BG from '@/public/gallery/pre-conf/portriat.png'
import Vis from '@/public/gallery/pre-conf/visualization.png'
export const simplifieds: {id:string; title: string; cat:string, strategy:string; desc: string; image: string;}[] = [
    {
        title: 'Sketch',
        id:'sketch',
        cat:'apps',
        image: Sketch.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Beautify',
        id:'beauty',
        cat:'apps',
        image: Beauty.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Post',
        id:'post',
        cat:'b2b',
        image: Post.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Architecture',
        id:'architecture',
        cat:'b2b',
        image: Arch.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Background remover',
        id:'2merkato',
        cat:'b2b',
        image: BG.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Cartoon',
        id:'ahun',
        cat:'apps',
        image: Cartoon.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Face Swap',
        id:'faceswap',
        cat:'b2b',
        image: Faceswap.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Website',
        id:'2merkato',
        cat:'b2b',
        image: Web.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Interior',
        id:'2merkato',
        cat:'b2b',
        image: Interior.src,
        desc: '',
        strategy: ''
    },
    {
        title: 'Visualization',
        id:'qr',
        cat:'b2b',
        image: Vis.src,
        desc: '',
        strategy: ''
    },
]