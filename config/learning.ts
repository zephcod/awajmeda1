import { Icons } from "@/components/icons"
import Best from '@/public/gallery/models/pose.jpg'
import Gen from '@/public/gallery/models/pose.jpg'
import Model from '@/public/gallery/models/pose.jpg'
import Prompt from '@/public/guide/prompt-eng.png'
export const guides: {id:string; title: string; image:string, icon: React.ComponentType<{ className?: string }>, desc: string;}[] = [
    {
        title: 'Generative AI 101',
        id:'generative-ai',
        image:Gen.src,
        icon: Icons.book,
        desc: 'A guide to the core principles and applications of Generative AI.',
    },
    {
        title: 'Prompt Engineering',
        id:'prompt-engineering',
        image:Prompt.src,
        icon: Icons.terminal,
        desc: 'The science of crafting effective prompts to guide AI models.',
    },
    {
        title: 'Generative Models',
        id:'generative-models',
        image:Model.src,
        icon: Icons.pencil,
        desc: 'List of advanced generative AI models included in Awaj AI.',
    },
    {
        title: 'Best Practices',
        id:'best-practices',
        image:Best.src,
        icon: Icons.star,
        desc: 'Planning, prompting, refining and generating for best results.',
    },
]