import { Icons } from "@/components/icons"
import Best from '@/public/guide/generative-ai-best-practices.png'
import Gen from '@/public/guide/101.png'
import Model from '@/public/guide/awaj_meda_models.jpg'
import Prompt from '@/public/guide/prompt-eng.png'
import Cat from '@/public/guide/Night_lamp__4099385905.png'
export const featuredGuides: {id:string; title: string; image:string, icon: React.ComponentType<{ className?: string }>, desc: string;}[] = [
    {
        title: 'Generative AI 101',
        id:'/guide/generative-ai/gen-ai-101',
        image:Gen.src,
        icon: Icons.book,
        desc: 'A guide to the core principles and applications of Generative AI.',
    },
    {
        title: 'Prompt Engineering',
        id:'/guide/prompting/basic-prompt-engineering',
        image:Prompt.src,
        icon: Icons.terminal,
        desc: 'The basics of crafting effective prompts to guide AI models.',
    },
    {
        title: 'Best Practices',
        id:'/guide/miscellaneous/best-practices',
        image:Best.src,
        icon: Icons.star,
        desc: 'Planning, prompting, refining and generating for best results.',
    },
    {
        title: 'Generative Models',
        id:'/guide/generative-ai/generative-models',
        image:Model.src,
        icon: Icons.pencil,
        desc: 'List of advanced generative AI models included in Awaj AI.',
    },
]

export type Chapters = {
    title: string;
    slug: string;
    desc: string;
    image?: string;
  };
export const categoryGuides: {id:string; title: string; image:string, desc: string, chapter:Chapters[];}[] = [
    {
        title: '1. Beginners guide',
        id:'beginners-guide',
        image:Cat.src,
        desc: 'A guide to the core principles and applications of Generative AI.',
        chapter:[
            {
            title:'Generating images',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'Working with templates',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'Managing coins',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'Personal gallery',
            slug:'#',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '2. Generative AI',
        id:'generative-ai',
        image:Cat.src,
        desc: 'The basics of crafting effective prompts to guide AI models.',
        chapter:[
            {
            title:'Generative AI 101',
            slug:'gen-ai-101',
            desc:'',
            image:Gen.src
            },
            {
            title:'Generative models',
            slug:'generative-models',
            desc:'',
            image:Model.src
            }
        ]
    },
    {
        title: '3. Prompting',
        id:'prompting',
        image:Cat.src,
        desc: 'Planning, prompting, refining and generating for best results.',
        chapter:[
            {
            title:'Basics of prompt engineering',
            slug:'basic-prompt-engineering',
            desc:'',
            image:Prompt.src
            },
            {
            title:'Advanced prompt engineering',
            slug:'#',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '4. Awaj use-cases',
        id:'awaj-ai-use-cases',
        image:Cat.src,
        desc: 'List of advanced generative AI models included in Awaj AI.',
        chapter:[
            {
            title:'Architecture and Design',
            slug:'#',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '5. Advanced applications',
        id:'advanced-applications',
        image:Cat.src,
        desc: 'List of advanced generative AI models included in Awaj AI.',
        chapter:[
            {
            title:'Control Net',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'Inpainting',
            slug:'#',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '6. Experimental applications',
        id:'experimental-applications',
        image:Cat.src,
        desc: 'List of advanced generative AI models included in Awaj AI.',
        chapter:[
            {
            title:'3D modeling',
            slug:'',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '7. Technologies',
        id:'ai-technologies',
        image:Cat.src,
        desc: 'List of advanced generative AI models included in Awaj AI.',
        chapter:[
            {
            title:'Emerging Research',
            slug:'',
            desc:'',
            image:Cat.src
            }
        ]
    },
    {
        title: '8. Miscellaneous',
        id:'miscellaneous',
        image:Cat.src,
        desc: 'List of advanced generative AI models included in Awaj AI.',
        chapter:[
            {
            title:'Best Practices',
            slug:'best-practices',
            desc:'',
            image:Best.src
            },
            {
            title:'Common mistakes',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'Risks and limitations',
            slug:'#',
            desc:'',
            image:Cat.src
            },
            {
            title:'AI representation of Africa',
            slug:'#',
            desc:'',
            image:Cat.src
            }
        ]
    },
]