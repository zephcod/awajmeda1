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
  Code,} from "lucide-react";
export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; icon: LucideIcon; items: Item[] }[] = [
  {
    name: 'Gallery',
    icon: GalleryThumbnails,
    items: [
      {
        name: 'Members Gallery',
        slug: 'gallery/members',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Personal Gallery',
        slug: 'gallery/personal',
        description: 'Organize routes without affecting URL paths',
      },
      {
        name: 'Saved Items',
        slug: 'gallery/saved',
        description: 'Render multiple pages in the same layout',
      },
      {
        name: 'Prompts Lab',
        slug: 'gallery/prompts',
        description: 'Render multiple pages in the same layout',
      },
    ],
  },
  {
    name: 'Image Generation',
    icon: Aperture,
    items: [
      {
        name: 'Pre-configured',
        slug: 'image/pre-configured',
        description:
          'Streaming data fetching from the server with React Suspense',
      },
      {
        name: 'Advanced Generation',
        slug: 'image/advanced',
        description:
          'Streaming data fetching from the server with React Suspense',
      },
      {
        name: 'Image Upscaling',
        slug: 'image/upscaling',
        description:
          'Streaming data fetching from the server with React Suspense',
      },
      {
        name: 'Image Blending',
        slug: 'image/blending',
        description: 'Server-render pages',
      },
      {
        name: 'Image Editing',
        slug: 'image/editing',
        description: 'Get the best of both worlds between static & dynamic',
      },
      {
        name: 'Image Inpainting',
        slug: 'image/inpainting',
        description: 'Get the best of both worlds between static & dynamic',
      },
    ],
  },
  {
    name: 'Audio Generation',
    icon: Headphones,
    items: [
      {
        name: 'Narration / text to audio',
        slug: 'audio/narration',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
      },
      {
        name: 'Dictaction / speech to text',
        slug: 'audio/dictation',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
      },
    ],
  },
  {
    name: 'Experimental 🚨',
    icon: VideoIcon,
    items: [
      {
        name: 'Copywrite',
        slug: 'experimental/copywrite',
        description: 'Preview the routing hooks available in Client Components',
      },
      {
        name: 'Translation',
        slug: 'experimental/translation',
        description: 'Preview the supported styling solutions',
      },
      {
        name: 'Code',
        slug: 'experimental/code',
        description: 'A collection of useful App Router code snippets',
      },
    ],
  },
];
