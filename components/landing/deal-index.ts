import gift from '@/public/blob/gift-card.json'
import community from '@/public/blob/community.json'
import template from '@/public/blob/template.json'
import learning from '@/public/blob/awajai-rocket.json'

export type DealProps =  {
    id: number; 
    title:string; 
    desc:string; 
    list1:string; 
    img:unknown; 
    link:string;
  }

export const deals: DealProps[] = [
    {
        id:1,
        title:"Redeem Gift",
        desc:"Get Your Free Gift Coins",
        img:gift,
        link:"/redeem",
        list1:"Take advantage of Awaj AI's diverse incentive programs.",
    },
    {
        id:2,
        title:"Join Us",
        desc:"Join Our Community",
        img:community,
        link:"/community",
        list1:"We foster a growing family of creators and marketers.",
    },
    {
        id:3,
        title:"Explore AI 101",
        desc:"Learn with Awaj AI Guides",
        img:learning,
        link:"/guide",
        list1:"Let our guides walk you through the fundamentals of AI.",
    },
    {
        id:4,
        title:"Browse Gallery",
        desc:"Visit Our Artistic Gallery",
        img:community,
        link:"/gallery",
        list1:"Witness impressive results generated from our community.",
    },
    {
        id:5,
        title:"Check Templates",
        desc:"Get Started with Templates",
        img:template,
        link:"/template",
        list1:"Puzzled on where to start the generative AI journey?",
    },
]

export const dealByIndex = (index: number): DealProps => deals[index % deals.length]