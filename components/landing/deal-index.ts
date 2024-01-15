import image1 from '@/public/deals/deal-1-starter.png'
import image2 from '@/public/deals/deal-2-launcher.png'
import image3 from '@/public/deals/deal-3-booster.png'
import image4 from '@/public/deals/deal-4-miner.png'
import image5 from '@/public/deals/deal-5-orbiter.png'
import image6 from '@/public/deals/deal-6-actuator.png'
import gift from '@/public/blob/gift-card.json'
import community from '@/public/blob/community.json'
import template from '@/public/blob/template.json'
import learning from '@/public/blob/awajai-rocket.json'

export const images: string[] = [image1.src, image2.src, image3.src, image4.src, image5.src, image6.src]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex

export type DealProps =  {
    id: number; 
    title:string; 
    desc:string; 
    list1:string; 
    img:unknown; 
    link:string;
    values:number[];
  }

export const deals: DealProps[] = [
    {
        id:1,
        title:"Redeem Gift",
        desc:"Get Your Free Gift Coins",
        img:gift,
        link:"/redeem",
        values: [7,3,9,4,3,8,5,4,6],
        list1:"Take advantage of Awaj AI's diverse incentive programs.",
    },
    {
        id:2,
        title:"Join Us",
        desc:"Join Our Community",
        img:community,
        link:"/community",
        values: [7,3,9,4,3,8,5,4,6],
        list1:"We foster a growing family of creators and marketers.",
    },
    {
        id:3,
        title:"Explore AI 101",
        desc:"Learn with Awaj AI Guides",
        img:learning,
        link:"/guide",
        values: [7,3,9,4,3,8,5,4,6],
        list1:"Let our guides walk you through the fundamentals of AI.",
    },
    {
        id:4,
        title:"Browse Gallery",
        desc:"Visit Our Artistic Gallery",
        img:community,
        link:"/gallery",
        values: [7,3,9,4,3,8,5,4,6],
        list1:"Witness impressive results generated from our community.",
    },
    {
        id:5,
        title:"Check Templates",
        desc:"Get Started with Templates",
        img:template,
        link:"/template",
        values: [7,3,9,4,3,8,5,4,6],
        list1:"Puzzled on where to start the generative AI journey?",
    },
]

export const dealByIndex = (index: number): DealProps => deals[index % deals.length]