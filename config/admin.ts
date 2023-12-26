import { LucideIcon,
  CreditCard,
  Settings,
  PlusCircle,
  Gauge,
  User2,
  GalleryThumbnails,
  MessageSquare,
  Aperture,
  Headphones,
  VideoIcon,
  Code,
  Crop,
  Image,
  HeartIcon,
  Edit,
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
    name: 'Simplified',
    items: [
      {
        name: 'Popular',
        slug: 'simplified',
        description: 'Create UI that is shared across routes',
        icon: HeartIcon,
      },
      {
        name: 'Upscale',
        slug: 'simplified/upscale',
        description: 'Organize routes without affecting URL paths',
        icon: Crop,
      },
      {
        name: 'Background remover',
        slug: 'simplified/background-remover',
        description: 'Render multiple pages in the same layout',
        icon: ImageDown,
      },
      {
        name: 'QR Code',
        slug: 'simplified/qr-code',
        description: 'Render multiple pages in the same layout',
        icon: QrCode,
      },
    ],
  },
  {
    name: 'Image Generation',
    items: [
      {
        name: 'Text to Image',
        slug: 'image/txt2img',
        description:'Streaming data fetching from the server with React Suspense',
        icon: Aperture,
      },
      {
        name: 'Image Upscaling',
        slug: 'image/upscaling',
        description:'Streaming data fetching from the server with React Suspense',
        icon: Aperture,
      },
      {
        name: 'Image Blending',
        slug: 'image/blending',
        description: 'Server-render pages',
        icon: Aperture,
      },
      {
        name: 'Image Editing',
        slug: 'image/editing',
        description: 'Get the best of both worlds between static & dynamic',
        icon: Aperture,
      },
      {
        name: 'Image Inpainting',
        slug: 'image/inpainting',
        description: 'Get the best of both worlds between static & dynamic',
        icon: Aperture,
      },
    ],
  },
  {
    name: 'Audio Generation',
    items: [
      {
        name: 'Narration / text to audio',
        slug: 'audio/narration',
        description:'Pass context between Client Components that cross Server/Client Component boundary',
        icon: Headphones,
      },
      {
        name: 'Dictaction / speech to text',
        slug: 'audio/dictation',
        description:'Pass context between Client Components that cross Server/Client Component boundary',
        icon: Edit3,
      },
    ],
  },
  {
    name: 'Experimental 🚨',
    items: [
      {
        name: 'Copywrite',
        slug: 'experimental/copywrite',
        description: 'Preview the routing hooks available in Client Components',
        icon: Edit,
      },
      {
        name: 'Translation',
        slug: 'experimental/translation',
        description: 'Preview the supported styling solutions',
        icon: Languages,
      },
      {
        name: 'Code',
        slug: 'experimental/code',
        description: 'A collection of useful App Router code snippets',
        icon: Code2,
      },
    ],
  },
];
