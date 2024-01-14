import { Icons } from "@/components/icons"
export const guides: {id:string; title: string; cat:string, icon: React.ComponentType<{ className?: string }>, desc: string;}[] = [
    {
        title: 'Generative AI 101',
        id:'generative-ai',
        cat:'apps',
        icon: Icons.book,
        desc: 'A guide to the core principles and applications of Generative AI.',
    },
    {
        title: 'Prompt Engineering',
        id:'prompt-engineering',
        cat:'apps',
        icon: Icons.terminal,
        desc: 'The science of crafting effective prompts to guide AI models.',
    },
    {
        title: 'Generative Models',
        id:'generative-models',
        cat:'b2b',
        icon: Icons.pencil,
        desc: 'List of advanced generative AI models included in Awaj AI.',
    },
    {
        title: 'Best Practices',
        id:'best-practices',
        cat:'b2b',
        icon: Icons.star,
        desc: 'Planning, prompting, refining and generating for best results.',
    },
]