import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // DATABASE_URL: z.string('mongodb+srv://sofoniasmelesse:zPwqM3SNElgoIuWQ@cluster47.4x7suhs.mongodb.net/test?retryWrites=true&w=majority'),
    NODE_ENV: z.enum(["development", "test", "production"]),
    // CLERK_SECRET_KEY: z.string('sk_test_RChscSwKLC1wixP2fYYpjZoHUWqb0QwyQZCIK0pY81'),
    // RESEND_API_KEY: z.string("re_DezGELzD_6k9PMZrR4uNy8dDS3s44RjDH"),
    // EMAIL_FROM_ADDRESS: z.string().email("cto@gebeyaw.com"),
    
    // UPLOADTHING_SECRET: z.string("sk_live_630074e7a117be444d0929d1e3d42d3de2f0c02f810cdcff870f4b0047a49bcb"),
    // UPLOADTHING_APP_ID: z.string("pjkq008pqs"),
    
    // POSTGRES_URL: z.string("postgres://default:6pkql7TQhEYi@ep-withered-poetry-08252282-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"),
    // POSTGRES_PRISMA_URL: z.string("postgres://default:6pkql7TQhEYi@ep-withered-poetry-08252282-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"),
    // POSTGRES_URL_NON_POOLING: z.string("postgres://default:6pkql7TQhEYi@ep-withered-poetry-08252282.us-east-1.postgres.vercel-storage.com:5432/verceldb"),
    // POSTGRES_USER: z.string("default"),
    // POSTGRES_HOST: z.string("ep-withered-poetry-08252282-pooler.us-east-1.postgres.vercel-storage.com"),
    // POSTGRES_PASSWORD: z.string("6pkql7TQhEYi"),
    // POSTGRES_DATABASE: z.string("verceldb"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url('https://meda.awajai.com'),
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string('pk_test_aG9seS1jYWltYW4tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA'),

  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    // DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    // POSTGRES_URL: process.env.POSTGRES_URL,
    // POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    // POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    // POSTGRES_USER: process.env.POSTGRES_USER,
    // POSTGRES_HOST: process.env.POSTGRES_HOST,
    // POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    // POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,

    // RESEND_API_KEY: process.env.RESEND_API_KEY,
    // EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    // UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    // UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    // STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
    // STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,

  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
