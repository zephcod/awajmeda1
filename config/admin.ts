import { LucideIcon,
  CreditCard,
  Settings,
  PlusCircle,
  Gauge,
  User2,
  GalleryThumbnails,
  MessageSquare,
  Aperture,
  Bot,
  Headphones,
  VideoIcon,
  Code,
  Crop,
  Tv2,
  Image,
  ImagePlus,
  ImageMinus,
  ImageOff,
  HeartIcon,
  Edit,
  Music,
  Paintbrush,
  FileImage,
  Edit2,
  Code2,
  Speaker,
  Languages,
  Edit3,
  ImageDown,
  QrCode,} from "lucide-react";
export type Item = {
  name: string;
  slug: string;
  description?: string;
  icon: LucideIcon;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Quick Access',
    items: [
      {
        name: 'Home',
        slug: '',
        description: 'Organize routes without affecting URL paths',
        icon: Tv2,
      },
      {
        name: 'Chat',
        slug: 'chat',
        description: 'Organize routes without affecting URL paths',
        icon: Bot,
      },
      {
        name: 'Templates',
        slug: 'template',
        description: 'Create UI that is shared across routes',
        icon: HeartIcon,
      },
      {
        name: 'QR Code',
        slug: 'template/qr-code',
        description: 'Render multiple pages in the same layout',
        icon: QrCode,
      },
    ],
  },
  {
    name: 'Image Generation',
    items: [
      {
        name: 'Text to Image SD',
        slug: 'image/txt2img',
        description:'Streaming data fetching from the server with React Suspense',
        icon: ImageMinus,
      },
      {
        name: 'Text to Image XL',
        slug: 'image/txt2imgXL',
        description:'Streaming data fetching from the server with React Suspense',
        icon: ImagePlus,
      },
      {
        name: 'Image Blending',
        slug: 'image/blending',
        description: 'Server-render pages',
        icon: ImageOff,
      },
      {
        name: 'Image Editing',
        slug: 'image/editing',
        description: 'Get the best of both worlds between static & dynamic',
        icon: Image,
      },
      {
        name: 'Controlled Image',
        slug: 'image/controlled',
        description: 'Get the best of both worlds between static & dynamic',
        icon: Aperture,
      },
      {
        name: 'Image Inpainting',
        slug: 'image/inpainting',
        description: 'Get the best of both worlds between static & dynamic',
        icon: Paintbrush,
      },
      {
        name: 'Image Upscale',
        slug: 'image/upscale',
        description: 'Organize routes without affecting URL paths',
        icon: Crop,
      },
      {
        name: 'Remove Background',
        slug: 'image/background-remover',
        description: 'Render multiple pages in the same layout',
        icon: ImageDown,
      },
    ],
  },
  // {
  //   name: 'Audio Generation',
  //   items: [
  //     {
  //       name: 'Narration / text to audio',
  //       slug: 'audio/narration',
  //       description:'Pass context between Client Components that cross Server/Client Component boundary',
  //       icon: Headphones,
  //     },
  //     {
  //       name: 'Dictaction / speech to text',
  //       slug: 'audio/dictation',
  //       description:'Pass context between Client Components that cross Server/Client Component boundary',
  //       icon: Edit3,
  //     },
  //     {
  //       name: 'Music Generation',
  //       slug: 'audio/music',
  //       description:'Pass context between Client Components that cross Server/Client Component boundary',
  //       icon: Music,
  //     },
  //   ],
  // },
  // {
  //   name: 'Experimental 🚨',
  //   items: [
  //     {
  //       name: 'Copywrite',
  //       slug: 'experimental/copywrite',
  //       description: 'Preview the routing hooks available in Client Components',
  //       icon: Edit,
  //     },
  //     {
  //       name: 'Translation',
  //       slug: 'experimental/translation',
  //       description: 'Preview the supported styling solutions',
  //       icon: Languages,
  //     },
  //     {
  //       name: 'Code',
  //       slug: 'experimental/code',
  //       description: 'A collection of useful App Router code snippets',
  //       icon: Code2,
  //     },
  //   ],
  // },
];
